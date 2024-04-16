import numpy as np
import pickle as pkl

# ye bss sample hai

# Load the trained Decision Tree model
loaded_model = pkl.load(open("Decision_tree_model.sav", 'rb'))

# Function to get input from the user and make predictions
def predict_dyslexia():
    # Get input from the user
    spelling_accuracy = float(input("Enter spelling accuracy: "))
    gramatical_accuracy = float(input("Enter grammatical accuracy: "))
    percentage_of_corrections = float(input("Enter percentage of corrections: "))
    percentage_of_phonetic_accuraccy = float(input("Enter percentage of phonetic accuracy: "))
    
    # Make predictions using the loaded model
    prediction = loaded_model.predict(np.array([[spelling_accuracy, gramatical_accuracy, percentage_of_corrections, percentage_of_phonetic_accuraccy]]))
    
    # Print the prediction
    if prediction[0] == 1:
        print("You have dyslexia.")
    else:
        print("You are not dyslexic.")

# Call the function to make predictions based on user input
predict_dyslexia()