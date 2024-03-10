from flask import Flask, request, render_template, Response
from flask_cors import CORS, cross_origin
from gtts import gTTS
import os
import random
import csv

from testdir.test import levenshtein, get_feature_array, score
from flask import jsonify

app = Flask(__name__)
CORS(app)

# Computer will speak almost 10 words
spoken_words = []

@app.route('/api/fetchWords', methods=['POST'])
@cross_origin(origin='http://localhost:3000')  # Allow requests from localhost:3000
def fetch_words():
    # Load the elementary vocabulary from CSV
    global spoken_words
    spoken_words.clear()
    vocabulary = load_elementary_vocabulary()

    # Select and return 10 random words
    random_words = random.sample(vocabulary, 10)

    # Store the selected random words in the spoken_words array
    spoken_words.extend(random_words)

    response = {
        "ok": True,
        "message": "Fetch word successfully",
        "random_words": random_words
    }

    return jsonify(response)


def load_elementary_vocabulary():
    vocabulary = []
    resources_folder = os.path.join(os.getcwd(), 'resource')
    csv_file_path = os.path.join(resources_folder, 'elementary_voc.csv')

    with open(csv_file_path, 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            vocabulary.extend(row)
    return vocabulary


# Submit words from form
@app.route('/api/submitWords', methods=['POST'])
@cross_origin(origin='http://localhost:3000')  # Allow requests from localhost:3000
def submit_words():
    request_data = request.json  
    submitted_words = request_data  

    # Calculate score using Levenshtein distance (assuming levenshtein function is defined)
    score = levenshtein(spoken_words, submitted_words)

    print("Score is", score) 

    response = {
        "ok": True,
        "message": "Score Available",
        "score": score
    }
    
    return jsonify(response)


# # Submit text from form
# @app.route('/submit_text', methods=['POST'])
# def submit_text():
#     if request.method == 'POST':
#         user_text = request.form['user_text']
#         print("User submitted text:", user_text)

#         # Use the user_text as input for get_feature_array
#         feature_array = get_feature_array(user_text)
#         result = score(feature_array)

#         if result[0] == 1:
#             word = "From the tests on this handwriting sample, there is a very slim chance that this person is suffering from dyslexia or dysgraphia"
#             print("From the tests on this handwriting sample, there is a very slim chance that this person is suffering from dyslexia or dysgraphia")
#         else:
#             word = "From the tests on this handwriting sample, there is a very high chance that this person is suffering from dyslexia or dysgraphia"
#             print("From the tests on this handwriting sample, there is a very high chance that this person is suffering from dyslexia or dysgraphia")

#     # Render index.html and pass the prediction word
#     return render_template('index.html', prediction=word)

if __name__ == '__main__':
    app.run(debug=True, port=8000)
