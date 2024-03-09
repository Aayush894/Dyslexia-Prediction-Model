import NavBar from "./../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";

function TextPrediction() {
  const [words, setWords] = useState(""); 
  const [spoken_text, setSpokenText] = useState([]);
  const [score, setScore] = useState(0); 

  useEffect(() => {
    fetchSpokenText();
  }, []); 

  const fetchSpokenText = () => {
    fetch("http://127.0.0.1:8000/api/fetchWords")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch spoken text");
        }
        console.log(response) ;
        return response.json();
      })
      .then(data => {
        // Set fetched spoken text in state
        setSpokenText(data);
      })
      .catch(error => {
        console.error("Error fetching spoken text:", error);
      });
  };

  console.log(spoken_text) ; 

  const handleSpeak = () => {
    // Join the spoken text array into a single string
    const spokenText = spoken_text.join(' ');
    // Create a new SpeechSynthesisUtterance instance with the spoken text
    const utterance = new SpeechSynthesisUtterance(spokenText);
    // Speak the text
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let inputWords = ""; 
    const form = event.target;
    const formData = new FormData(form);
  
    for (let i = 1; i <= 10; i++) {
      const word = formData.get(`word${i}`);
      inputWords += word + " ";
      form.elements[`word${i}`].value = "";
    }
    setWords(inputWords.trim());
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col h-screen mb-20">
        <div className="flex-grow">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Type your words here, and let Google Assistant speak them aloud.</h1>
            <form onSubmit={handleSpeak}>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Make Google Assistant speak</button>
            </form>

            <h2 className="text-xl font-bold mt-8">Enter 10 words to be spoken</h2>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(10)].map((_, index) => (
                  <div key={index}>
                    <label htmlFor={`word${index + 1}`} className="block mb-2 font-bold">Word {index + 1}:</label>
                    <input type="text" id={`word${index + 1}`} name={`word${index + 1}`} className="border border-gray-300 rounded px-4 py-2 w-full bg-white" />
                  </div>
                ))}
              </div>
              <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Submit</button>
            </form>

            <div className="info-section mt-8">
              <h2 className="text-xl font-bold">What you wrote:</h2>
              {words ? <p>{words}</p> : <p>No words submitted yet.</p>}
            </div>

            <div className="info-section">
              <h2 className="text-xl font-bold">What Google Assistant said:</h2>
              {spoken_text.length > 0 ? <p>{spoken_text.join(' ')}</p> : <p>No text spoken yet.</p>}
            </div>

            <div className="info-section">
              <h2 className="text-xl font-bold">Score (minimum is better):</h2>
              {score ? <p>{score}</p> : <p>No text spoken yet.</p>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TextPrediction;
