from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle as pkl
import numpy as np
from textblob import TextBlob
import language_tool_python
import requests
from abydos.phonetic import Soundex, Metaphone, Caverphone, NYSIIS

app = Flask(__name__)

# Specify the allowed origins
allowed_origins = [
    'https://localhost:5000',  # Add your specific allowed domains here
    'https://dyslexia-prediction-model-ia3w.onrender.com'
]

# Apply CORS settings globally
CORS(app, origins=allowed_origins)

# text correction API authentication
api_key_textcorrection = "eaeb9fb5a72f4e529111856dfabd43aa"
endpoint_textcorrection = "https://api.bing.microsoft.com/"

my_tool = language_tool_python.LanguageTool('en-US')

quiz_model = None
with open(r"Random_Forest_Model.sav", 'rb') as file:
  quiz_model = pkl.load(file)

loaded_model = None
with open(r"Decision_tree_model.sav", 'rb') as file:
  loaded_model = pkl.load(file)

def levenshtein(s1, s2):
    matrix = [[0] * (len(s2) + 1) for _ in range(len(s1) + 1)]
    for i in range(len(s1) + 1):
        matrix[i][0] = i
    for j in range(len(s2) + 1):
        matrix[0][j] = j
    for i in range(1, len(s1) + 1):
        for j in range(1, len(s2) + 1):
            cost = 0 if s1[i - 1] == s2[j - 1] else 1
            matrix[i][j] = min(matrix[i - 1][j] + 1,
                               matrix[i][j - 1] + 1,
                               matrix[i - 1][j - 1] + cost)
    return matrix[len(s1)][len(s2)]

def spelling_accuracy(extracted_text):
  spell_corrected = TextBlob(extracted_text).correct()
  return ((len(extracted_text) - (levenshtein(extracted_text, spell_corrected)))/(len(extracted_text)+1))*100

def gramatical_accuracy(extracted_text):
  spell_corrected = TextBlob(extracted_text).correct()
  correct_text = my_tool.correct(spell_corrected)
  extracted_text_set = set(spell_corrected.split(" "))
  correct_text_set = set(correct_text.split(" "))
  n = max(len(extracted_text_set - correct_text_set),
          len(correct_text_set - extracted_text_set))
  return ((len(spell_corrected) - n)/(len(spell_corrected)+1))*100

def percentage_of_corrections(extracted_text):
  data = {'text': extracted_text}
  params = {
    'mkt': 'en-us',
    'mode': 'proof'
  }
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Ocp-Apim-Subscription-Key': api_key_textcorrection,
  }
  response = requests.post(endpoint_textcorrection, headers=headers, params=params, data=data)
  json_response = response.json()
  flagged_tokens_count = len(json_response.get('flaggedTokens', []))
  extracted_word_count = len(extracted_text.split(" "))
  if extracted_word_count > 0:
    percentage_corrected = (flagged_tokens_count / extracted_word_count) * 100
  else:
    percentage_corrected = 0
  return percentage_corrected

def percentage_of_phonetic_accuraccy(extracted_text: str):
  soundex = Soundex()
  metaphone = Metaphone()
  caverphone = Caverphone()
  nysiis = NYSIIS()
  spell_corrected = TextBlob(extracted_text).correct()

  extracted_text_list = extracted_text.split(" ")
  extracted_phonetics_soundex = [soundex.encode(string) for string in extracted_text_list]
  extracted_phonetics_metaphone = [metaphone.encode(string) for string in extracted_text_list]
  extracted_phonetics_caverphone = [caverphone.encode(string) for string in extracted_text_list]
  extracted_phonetics_nysiis = [nysiis.encode(string) for string in extracted_text_list]

  extracted_soundex_string = " ".join(extracted_phonetics_soundex)
  extracted_metaphone_string = " ".join(extracted_phonetics_metaphone)
  extracted_caverphone_string = " ".join(extracted_phonetics_caverphone)
  extracted_nysiis_string = " ".join(extracted_phonetics_nysiis)

  spell_corrected_list = spell_corrected.split(" ")
  spell_corrected_phonetics_soundex = [soundex.encode(string) for string in spell_corrected_list]
  spell_corrected_phonetics_metaphone = [metaphone.encode(string) for string in spell_corrected_list]
  spell_corrected_phonetics_caverphone = [caverphone.encode(string) for string in spell_corrected_list]
  spell_corrected_phonetics_nysiis = [nysiis.encode(string) for string in spell_corrected_list]

  spell_corrected_soundex_string = " ".join(spell_corrected_phonetics_soundex)
  spell_corrected_metaphone_string = " ".join(spell_corrected_phonetics_metaphone)
  spell_corrected_caverphone_string = " ".join(spell_corrected_phonetics_caverphone)
  spell_corrected_nysiis_string = " ".join(spell_corrected_phonetics_nysiis)

  soundex_score = (len(extracted_soundex_string)-(levenshtein(extracted_soundex_string,spell_corrected_soundex_string)))/(len(extracted_soundex_string)+1)
  metaphone_score = (len(extracted_metaphone_string)-(levenshtein(extracted_metaphone_string,spell_corrected_metaphone_string)))/(len(extracted_metaphone_string)+1)
  caverphone_score = (len(extracted_caverphone_string)-(levenshtein(extracted_caverphone_string,spell_corrected_caverphone_string)))/(len(extracted_caverphone_string)+1)
  nysiis_score = (len(extracted_nysiis_string)-(levenshtein(extracted_nysiis_string,spell_corrected_nysiis_string)))/(len(extracted_nysiis_string)+1)
  return ((0.5*caverphone_score + 0.2*soundex_score + 0.2*metaphone_score + 0.1 * nysiis_score))*100

def calculate_score(extracted_phonetics, spell_corrected_phonetics):
    total_distance = sum(levenshtein(extracted, corrected) for extracted, corrected in zip(extracted_phonetics, spell_corrected_phonetics))
    return (1 - total_distance / len(extracted_phonetics)) if extracted_phonetics else 0

def get_feature_array(extracted_text):
  feature_array = []
  feature_array.append(spelling_accuracy(extracted_text))
  feature_array.append(gramatical_accuracy(extracted_text))
  feature_array.append(percentage_of_corrections(extracted_text))
  feature_array.append(percentage_of_phonetic_accuraccy(extracted_text))
  return feature_array

def get_result(lang_vocab, memory, speed, visual, audio, survey):
  array = np.array([[lang_vocab, memory, speed, visual, audio, survey]])
  label = int(quiz_model.predict(array))
  if(label == 0):
    output = "There is a high chance of the applicant to have dyslexia."
  elif(label == 1):
    output = "There is a moderate chance of the applicant to have dyslexia."
  else:
    output = "There is a low chance of the applicant to have dyslexia."
  return output

# define Routes
@app.route('/api/submit_text', methods=['GET', 'POST'])
def submit_text():
    request_data = request.json  
    extracted_text = request_data.get('text')
    features = get_feature_array(extracted_text)
    features_array = np.array([features])
    prediction = loaded_model.predict(features_array)
    result = "There's a high chance that this person is suffering from dyslexia or dysgraphia" if prediction[0] == 1 else "There's a very slim chance that this person is suffering from dyslexia or dysgraphia"
    response = {
        "ok": True,
        "message": "Score Available",
        "result": result,
    }
    return jsonify(response)

@app.route('/api/submit_quiz', methods=['GET', 'POST'])
def submit_quiz():
  data = request.json  
  extracted_object = data.get('quiz')
  time_value = data.get('time')

  lang_vocab = (extracted_object['q1'] + extracted_object['q2'] + extracted_object['q3'] + extracted_object['q4'] + extracted_object['q5'] + extracted_object['q6'] + extracted_object['q8'])/28
  memory = (extracted_object['q2']+ extracted_object['q9'])/8
  speed = 1 - (time_value / 60000) ; 
  # speed = 0.5
  visual = (extracted_object['q1'] + extracted_object['q3'] + extracted_object['q4'] + extracted_object['q6'])/16
  audio = (extracted_object['q7']+extracted_object['q10'])/8

  # request_data = request.json  
  # extracted_array = request_data.quiz
  # # i have an array and time 

  # lang_vocab = (extracted_array[1] + extracted_array[2] + extracted_array[3] + extracted_array[4] + extracted_array[5] + extracted_array[6] + extracted_array[8])/28
  # memory = (extracted_array[2]+ extracted_array[9])/8
  # speed = 0.5
  # visual = (extracted_array[1] + extracted_array[3] + extracted_array[4] + extracted_array[6])/16
  # audio = (extracted_array[7]+extracted_array[10])/8

  survey = (lang_vocab + memory + speed + visual + audio)/80
  result = get_result(lang_vocab, memory, speed, visual, audio, survey)

  response = {
    "ok": True,
    "message": "Score Available",
    "result": result
  }
  return jsonify(response)


# ****************************************************************
if __name__ == '__main__':
  print("server is running on port 8000")
  app.run(debug=True, host='0.0.0.0', port=8000)