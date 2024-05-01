import pandas as pd
import numpy as np
import pickle as pkl

# here i am testing the model which i have extraceted

# Load the test data
test_data = pd.read_csv("/home/abhishek/Documents/Aayush_Dyslexia/Dysgraphia-Prediction-Model/flask_server/quizData/unlabeled_dysx.csv")

# Load the trained Decision Tree model
loaded_model = pkl.load(open("/home/abhishek/Documents/Aayush_Dyslexia/Dysgraphia-Prediction-Model/flask_server/testdir/Random_Forest_Model.sav", 'rb'))

# Predict dyslexia for each row in the test data
predictions = loaded_model.predict(test_data.drop("Label", axis=1))

# Map predictions to "high," "moderate," and "low"
prediction_map = {0: "0", 1: "1", 2: "2"}
predicted_labels = [prediction_map[prediction] for prediction in predictions]

# Add the predictions to the test data
test_data["Predicted_Label"] = predicted_labels

# Print the test data with predicted dyslexia
print(test_data)
