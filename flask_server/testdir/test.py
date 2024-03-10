from textblob import TextBlob
import language_tool_python
import requests
import pandas as pd
import os
from abydos.phonetic import Soundex, Metaphone, Caverphone, NYSIIS

# ****************************************************************
def levenshtein(s1, s2):
    # Initialize a matrix to store the Levenshtein distances
    matrix = [[0] * (len(s2) + 1) for _ in range(len(s1) + 1)]

    # Initialize the first row and column of the matrix
    for i in range(len(s1) + 1):
        matrix[i][0] = i
    for j in range(len(s2) + 1):
        matrix[0][j] = j

    # Compute Levenshtein distance for each pair of substrings
    for i in range(1, len(s1) + 1):
        for j in range(1, len(s2) + 1):
            cost = 0 if s1[i - 1] == s2[j - 1] else 1
            matrix[i][j] = min(matrix[i - 1][j] + 1,      # Deletion
                               matrix[i][j - 1] + 1,      # Insertion
                               matrix[i - 1][j - 1] + cost)  # Substitution

    # Return the Levenshtein distance between the last elements of s1 and s2
    return matrix[len(s1)][len(s2)]

# ***************************************************
def spelling_accuracy(extracted_text):
  spell_corrected = TextBlob(extracted_text).correct()
  return ((len(extracted_text) - (levenshtein(extracted_text, spell_corrected)))/(len(extracted_text)+1))*100


# ***************************************************
my_tool = language_tool_python.LanguageTool('en-US')


# ***************************************************
def gramatical_accuracy(extracted_text):
  spell_corrected = TextBlob(extracted_text).correct()
  correct_text = my_tool.correct(spell_corrected)
  extracted_text_set = set(spell_corrected.split(" "))
  correct_text_set = set(correct_text.split(" "))
  n = max(len(extracted_text_set - correct_text_set),
          len(correct_text_set - extracted_text_set))
  return ((len(spell_corrected) - n)/(len(spell_corrected)+1))*100

# ****************************************************

# text correction API authentication
api_key_textcorrection = "eaeb9fb5a72f4e529111856dfabd43aa"
endpoint_textcorrection = "https://api.bing.microsoft.com/"


# ****************************************************
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

# ****************************************************
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
  # print(spell_corrected_soundex_string)
  # print(extracted_soundex_string)
  # print(soundex_score)
  metaphone_score = (len(extracted_metaphone_string)-(levenshtein(extracted_metaphone_string,spell_corrected_metaphone_string)))/(len(extracted_metaphone_string)+1)
  # print(metaphone_score)
  caverphone_score = (len(extracted_caverphone_string)-(levenshtein(extracted_caverphone_string,spell_corrected_caverphone_string)))/(len(extracted_caverphone_string)+1)
  # print(caverphone_score)
  nysiis_score = (len(extracted_nysiis_string)-(levenshtein(extracted_nysiis_string,spell_corrected_nysiis_string)))/(len(extracted_nysiis_string)+1)
  # print(nysiis_score)
  return ((0.5*caverphone_score + 0.2*soundex_score + 0.2*metaphone_score + 0.1 * nysiis_score))*100


# ****************************************************************
def calculate_score(extracted_phonetics, spell_corrected_phonetics):
    total_distance = sum(levenshtein(extracted, corrected) for extracted, corrected in zip(extracted_phonetics, spell_corrected_phonetics))
    return (1 - total_distance / len(extracted_phonetics)) if extracted_phonetics else 0


# ****************************************************************
def get_feature_array(path: str):
  # path is the path of image, but i am using text.
  feature_array = []
  # extracted_text = image_to_text(path)
  # *****************************************************************************************
  extracted_text = 'knowing the time of separation and the activity of the lead-210 solution, the ingrauth Of the bismuth-210 can be calculated. The absolute activity of the reference standards can be calculated from the known activity of the lead-210 solution and the chemical yleld, but this calculation is unneces necessary. Provided the same lead carrier solution is used to prepare and the reference standards For the analyses.'
  # *****************************************************************************************
  feature_array.append(spelling_accuracy(extracted_text))
  feature_array.append(gramatical_accuracy(extracted_text))
  feature_array.append(percentage_of_corrections(extracted_text))
  feature_array.append(percentage_of_phonetic_accuraccy(extracted_text))
  return feature_array

# ****************************************************************************************
def generate_csv(folder: str, label: int, csv_name: str):
  arr = []
  for image in os.listdir(folder):
    path = os.path.join(folder, image)
    feature_array = get_feature_array(path)
    feature_array.append(label)
    # print(feature_array)
    arr.append(feature_array)
    print(feature_array)
  print(arr)
  pd.DataFrame(arr, columns=["spelling_accuracy", "gramatical_accuracy", " percentage_of_corrections",
                "percentage_of_phonetic_accuraccy", "presence_of_dyslexia"]).to_csv("test1.csv")

# ********************************
def score(input):
  if input[0] <= 96.40350723266602:
    var0 = [0.0, 1.0]
  else:
    if input[1] <= 99.1046028137207:
        var0 = [0.0, 1.0]
    else:
      if input[2] <= 2.408450722694397:
        if input[2] <= 1.7936508059501648:
          var0 = [1.0, 0.0]
        else:
          var0 = [0.0, 1.0]
      else:
        var0 = [1.0, 0.0]
  return var0


# Example usage of your functions:
extracted_text = 'your_extracted_text_here'
feature_array = get_feature_array(extracted_text)
result = score(feature_array)
if result[0] == 1:
    print("There's a very slim chance that this person is suffering from dyslexia or dysgraphia.")
else:
    print("There's a high chance that this person is suffering from dyslexia or dysgraphia")