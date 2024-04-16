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
    
    # Select 10 unique words from the vocabulary
    return random.sample(vocabulary, k=10)


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













if __name__ == '__main__':
    app.run(debug=True, port=8000)
