import numpy as np
import pandas as pd
import seaborn as sns
import pickle as pkl
from sklearn.metrics import confusion_matrix
import matplotlib.pyplot as plt

# Load the test data
test_data = pd.read_csv("/home/abhishek/Documents/TryingModel_Dyslexia/resources/test.csv")

# Extract features and target from the test data
x_test = test_data.drop(["presence_of_dyslexia"], axis="columns")
y_test = test_data["presence_of_dyslexia"]

# Load the trained Decision Tree model
loaded_model = pkl.load(open("Decision_tree_model.sav", 'rb'))

# Evaluate the model on the test data
test_accuracy = loaded_model.score(x_test, y_test)
print("Decision Tree Model Performance:")
print(f"Test Accuracy: {test_accuracy:.2%}")

# Generate confusion matrix for the test data
conf_matrix = confusion_matrix(loaded_model.predict(x_test), y_test)
sns.heatmap(conf_matrix, annot=True, fmt="d", cmap="Blues")

# Add axis labels for the confusion matrix plot
plt.xlabel("Predicted Labels")
plt.ylabel("True Labels")
plt.title("Confusion Matrix")
plt.show()
