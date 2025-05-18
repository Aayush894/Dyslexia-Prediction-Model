import pandas as pd
from sklearn.metrics import confusion_matrix
import seaborn as sns
import pickle as pkl

# Load the test data
test_data = pd.read_csv("D:\\MernStack_Projects\\DyslexiLens\\flask_server\\handwritting_model_data\\unlabeled_dysx.csv")

# Extract features and target from the test data
x_test = test_data.drop(["Label"], axis="columns")
y_test = test_data["Label"]

# Load the trained Decision Tree model
loaded_model = pkl.load(open("D:\\MernStack_Projects\\DyslexiLens\\flask_server\\testdir\\model_training_handwriting\\Random_Forest_Model.sav", 'rb'))

# Evaluate the model on the test data
print("Random forest model Performance:")
print("Test Accuracy:", loaded_model.score(x_test, y_test))


# Generate confusion matrix for the test data
conf_matrix = confusion_matrix(loaded_model.predict(x_test), y_test)
sns.heatmap(conf_matrix, annot=True, fmt="d", cmap="Blues")
