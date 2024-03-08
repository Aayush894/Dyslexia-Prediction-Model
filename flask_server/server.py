from flask import Flask, jsonify, request, render_template
import speech_recognition as sr
from gtts import gTTS
import os
import random
import csv
import time
from flask import redirect, url_for
from flask import Response
from flask import session
from pathlib import Path
from textblob import TextBlob
# import streamlit as st
from PIL import Image
import os
import language_tool_python
import requests
import pandas as pd
import random
import speech_recognition as sr
import pyttsx3
import time
import eng_to_ipa as ipa
import requests
from abydos.phonetic import Soundex, Metaphone, Caverphone, NYSIIS 

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# algorithm to match the strings
def levenshtein(s1, s2):
  if len(s1) < len(s2):
    return levenshtein(s2, s1)

  # len(s1) >= len(s2)
  if len(s2) == 0:
    return len(s1)

  previous_row = range(len(s2) + 1)
  for i, c1 in enumerate(s1):
    current_row = [i + 1]
    for j, c2 in enumerate(s2):
      # j+1 instead of j since previous_row and current_row are one character longer
        insertions = previous_row[j + 1] + 1
        deletions = current_row[j] + 1       # than s2
        substitutions = previous_row[j] + (c1 != c2)
        current_row.append(min(insertions, deletions, substitutions))
    previous_row = current_row

  return previous_row[-1]

# Calculate the dependent fields of the methods  
def spelling_accuracy(extracted_text):
    spell_corrected = TextBlob(extracted_text).correct()
    return ((len(extracted_text) - (levenshtein(extracted_text, spell_corrected)))/(len(extracted_text)+1))*100

# ***************************************************
my_tool = language_tool_python.LanguageTool('en-US')

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

def calculate_score(extracted_phonetics, spell_corrected_phonetics):
    total_distance = sum(levenshtein(extracted, corrected) for extracted, corrected in zip(extracted_phonetics, spell_corrected_phonetics))
    return (1 - total_distance / len(extracted_phonetics)) if extracted_phonetics else 0

# def get_feature_array(path: str):
def get_feature_array(text):
  # path is the path of image, but i am using text.******************************IMAGE****************
  feature_array = []
  # extracted_text = image_to_text(path)
  # *****************************************************************************************
  extracted_text = text
  # *****************************************************************************************
  feature_array.append(spelling_accuracy(extracted_text))
  feature_array.append(gramatical_accuracy(extracted_text))
  feature_array.append(percentage_of_corrections(extracted_text))
  feature_array.append(percentage_of_phonetic_accuraccy(extracted_text))
  return feature_array

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



if __name__ == "__main__": 
    app.run(debug=True, port=8000, host='0.0.0.0') 
