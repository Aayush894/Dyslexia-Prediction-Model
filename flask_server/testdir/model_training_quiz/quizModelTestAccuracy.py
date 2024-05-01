import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix
import seaborn as sns
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
import pickle as pkl
import m2cgen

# Load the test data
test_data = pd.read_csv("/home/abhishek/Documents/Aayush_Dyslexia/Dysgraphia-Prediction-Model/flask_server/quizData/unlabeled_dysx.csv")

# Extract features and target from the test data
x_test = test_data.drop(["Label"], axis="columns")
y_test = test_data["Label"]

# Load the trained Decision Tree model
loaded_model = pkl.load(open("/home/abhishek/Documents/Aayush_Dyslexia/Dysgraphia-Prediction-Model/flask_server/testdir/model_training_quiz/Random_Forest_Model.sav", 'rb'))

# Evaluate the model on the test data
print("Random forest model Performance:")
print("Test Accuracy:", loaded_model.score(x_test, y_test))

# Generate confusion matrix for the test data
sns.heatmap(confusion_matrix(loaded_model.predict(x_test), y_test), annot=True)
