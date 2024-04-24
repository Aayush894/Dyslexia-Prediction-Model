# ***************************************************Custom Spelling_accuracy
from spellchecker import SpellChecker

def calculate_spelling_accuracy(text):
    # Initialize the spell checker
    spell = SpellChecker()

    # Split the text into individual words
    words = text.split()

    # Find the words that may be misspelled
    misspelled = spell.unknown(words)

    # Calculate the spelling accuracy
    spelling_accuracy = (len(words) - len(misspelled)) / len(words)

    return spelling_accuracy

# Test the function
text = "This is a smple txt with some misspelled wrds."
print(f"Spelling Accuracy: {calculate_spelling_accuracy(text)}")


# ***************************************************
# def spelling_accuracy(extracted_text):
#   spell_corrected = TextBlob(extracted_text).correct()
#   return ((len(extracted_text) - (levenshtein(extracted_text, spell_corrected)))/(len(extracted_text)+1))*100
