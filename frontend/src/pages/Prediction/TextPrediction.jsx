import NavBar from "./../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";

function TextPrediction() {
  const [input_word, setInputWords] = useState("");
  const [spoken_text, setSpokenText] = useState([]);
  const [score, setScore] = useState(0);
  const [show_text, setShowText] = useState("");

  const fetchSpokenText = () => {
    fetch("http://127.0.0.1:8000/api/fetchWords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Optionally, you can include a request body if needed
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        const spokenText = data.random_words;
        setSpokenText(spokenText);

        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSpeak = (e) => {
    e.preventDefault();

    // Fetch available voices
    const voices = window.speechSynthesis.getVoices();
    const indianEnglishVoice = voices.find((voice) =>
      voice.name.includes("Google en-IN")
    );

    spoken_text.forEach((word, index) => {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.voice = indianEnglishVoice; // Set the Indian English accent voice
      utterance.onstart = () => {
        console.log(`Speaking word ${index + 1}: ${word}`);
      };
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, index * 3000); // Delay 3 seconds for each word

      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, index * 3000); // Delay 3 seconds for each word
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let inputWords = "";
    const formData = new FormData(event.target);
    const words = [];

    for (let i = 1; i <= 10; i++) {
      const word = formData.get(`word${i}`);
      words.push(word);
      inputWords += word + " ";
    }

    setInputWords(inputWords);
    setShowText(spoken_text);

    fetch("http://127.0.0.1:8000/api/submitWords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(words),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setScore(data.score);

        console.log("Score:", data.score);
        event.target.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchSpokenText();
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex flex-col h-screen mb-20">
        <div className="flex-grow">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">
              Type your words here, and let Google Assistant speak them aloud.
            </h1>
            <form onSubmit={handleSpeak}>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Make Google Assistant speak
              </button>
            </form>

            <h2 className="text-xl font-bold mt-8">
              Enter 10 words to be spoken
            </h2>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(10)].map((_, index) => (
                  <div key={index}>
                    <label
                      htmlFor={`word${index + 1}`}
                      className="block mb-2 font-bold"
                    >
                      Word {index + 1}:
                    </label>
                    <input
                      type="text"
                      id={`word${index + 1}`}
                      name={`word${index + 1}`}
                      className="border border-gray-300 rounded px-4 py-2 w-full bg-white"
                    />
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </form>

            <div className="text-center">
              <div className="mt-8 mb-2">
                <h2 className="text-xl font-bold">What you wrote:</h2>
                {input_word ? (
                  <p>{input_word}</p>
                ) : (
                  <p>No words submitted yet.</p>
                )}
              </div>

              <div className="mb-2">
                <h2 className="text-xl font-bold">
                  What Google Assistant said:
                </h2>
                {show_text.length > 0 ? (
                  <p>{show_text.join(" ")}</p>
                ) : (
                  <p>No text spoken yet.</p>
                )}
              </div>

              <div className="mb-2">
                <h2 className="text-xl font-bold">
                  Score (minimum is better):
                </h2>
                {score ? <p>{score}</p> : <p>No text spoken yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TextPrediction;
