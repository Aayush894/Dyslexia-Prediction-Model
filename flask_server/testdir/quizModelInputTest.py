from quizModel import model
# import DyslexiaML_final
import numpy as np

#Giving user description of model
print("Our model uses RandomForestClassifier with GridSearchCV to predict values from the given data.")
print("(Our model makes precitions with an error rate of 5.80%.)\n")

#Getting input from user
name = input("Enter name of appllicant: ")
print("\nThe scores of all the tests in quiz as well as survey need to be entered.")
print("All the values lie in the range 0 to 1.\n")
lang_vocab = float(input("Enter the score of Language Vocab test: "))
memory = float(input("Enter the score of Memory test: "))
speed = float(input("Enter the score of Speed test: "))
visual = float(input("Enter the score of Visual Discrimination test: "))
audio = float(input("Enter the score of Audio Discrimination test: "))
survey = float(input("Enter the score obtained from Survey: "))

#Creating a 2D array from the given scores.
#Input taken by our model is a 2D array.
#get_result function can be run to get result from the survey.
def get_result(lang_vocab, memory, speed, visual, audio, survey):
    #2D numpy array created with the values input by the user.
    array = np.array([[lang_vocab, memory, speed, visual, audio, survey]])
    #The output given by model is converted into an int and stored in label.
    label = int(model.predict(array))
    #Giving final output to user depending upon the model prediction.
    if(label == 0):
        output = "There is a high chance of the applicant to have dyslexia."
    elif(label == 1):
        output = "There is a moderate chance of the applicant to have dyslexia."
    else:
        output = "There is a low chance of the applicant to have dyslexia."
    return output

get_result(lang_vocab, memory, speed, visual, audio, survey)

