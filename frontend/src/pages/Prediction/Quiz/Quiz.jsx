/* eslint-disable react/prop-types */
import NavBar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

function Question({ id, text, options, imgSrc, audioSrc }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (optionValue) => {
    setSelectedOption(optionValue);
  };

  return (
    <div className="question">
      <span
        id={`question${id}`}
        onClick={() => setSelectedOption(null)}
        style={{ cursor: "pointer" }}
      >
        Question {id} {text}
      </span>
      <br />
      <br />
      <div className="content">
        <br />
        <br />
        {imgSrc.map((src, index) => (
          <img
            key={`image_${id}_${index}`}
            src={src}
            width={100}
            height={100}
            alt={`Question ${id} Image`}
          />
        ))}
        {audioSrc.map((src, index) => (
          <div key={`audio_${id}_${index}`}>
            <audio controls>
              <source src={src} type="audio/mp3" />
            </audio>
            <br />
            <br />
          </div>
        ))}
        {options.map((option, index) => (
          <React.Fragment key={`${id}-${index}`}>
            <input
              type="radio"
              id={`${id}-${index}`}
              name={`q${id}`}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => handleOptionClick(option.value)}
            />
            <label htmlFor={`${id}-${index}`} style={{ cursor: "pointer" }}>
              {option.label}
            </label>
            <br />
          </React.Fragment>
        ))}
      </div>
      <br />
    </div>
  );
}

function Quiz() {
  const formRef = useRef(null);
  const [result, setResult] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const form = formRef.current;
    const endTime = new Date().getTime();
    let data = {};

    try {
      if (!(form instanceof HTMLFormElement)) {
        throw new Error("Form element not found");
      }

      const formData = new FormData(form);

      formData.forEach((value, key) => {
        if (value[0] === "4") {
          data[key] = 4;
        } else {
          data[key] = 0;
        }
      });

      const time = endTime - startTime;
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/quizPrediction`;

      const response = await fetch(url, {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quiz: data,
          time: time,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Error submitting quiz");
      }

      const resultMessage = responseData.result;
      setProcessing(false);
      setResult(resultMessage);
      toast.success("Quiz submitted successfully!");

    } catch (error) {
      setProcessing(false);
      toast.error("Error: " + error.message);
      console.error("Error submitting quiz:", error);
    }
  };

  useEffect(() => {
    setStartTime(new Date().getTime());
  }, []);
  if (processing == true) {
    return (
      <>
        <div>
          <NavBar />
        </div>
        <div>
          <div className="parallax1">
            <div id="warning">
              <center>
                This quiz is specially designed for students to test if they are
                dyslexic or not. Students are advised to attempt all the questions
                patiently under the surveillance of an elder.
                <br />
                ALL THE BEST JUNIOR!
              </center>
            </div>
          </div>
          <div className="main">
            <div className="question">
              <center>
              <div className="text-center">
              <p className="mb-2 text-lg font-semibold"><b>Note:</b>Model Api is currently deployed on Render so it take initial load time</p>
              <p className="mb-2 text-lg ml-4 font-semibold">It takes at most 5 minutes</p>
              <p className="mb-4 text-lg font-semibold">Result in Processing</p>
              <div>
                <CircularProgress />
              </div>
            </div>
              </center>
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </>
    );
  }
  else if (result === "") {
    return (
      <>
        <div>
          <NavBar />
        </div>
        <div>
          <div className="parallax1">
            <div id="warning">
              <center>
                This quiz is specially designed for students to test if they are
                dyslexic or not. Students are advised to attempt all the questions
                patiently under the surveillance of an elder.
                <br />
                ALL THE BEST JUNIOR!
              </center>
            </div>
          </div>
          <div className="main">
            <form name="quiz" ref={formRef}>
              <div className="question">
                <Question
                  id={1}
                  text="Check whether these two alphabets are same or not?"
                  options={[
                    { value: "4a", label: "Yes" },
                    { value: "0a", label: "No" },
                  ]}
                  imgSrc={["/assets/o.png", "/assets/0.jpeg"]}
                  audioSrc={[]}
                />

                <Question
                  id={2}
                  text="Guess the fruit in the picture below."
                  options={[
                    { value: "4b", label: "Grapes" },
                    { value: "0b", label: "Orange" },
                    { value: "0c", label: "Banana" },
                    { value: "0d", label: "Mango" },
                  ]}
                  imgSrc={["/assets/grapes.jpeg"]}
                  audioSrc={[]}
                />

                <Question
                  id={3}
                  text="Check whether these two alphabets are same or not?"
                  options={[
                    { value: "0e", label: "Yes" },
                    { value: "4e", label: "No" },
                  ]}
                  imgSrc={["/assets/g.jpg", "/assets/s.jpeg"]}
                  audioSrc={[]}
                />

                <Question
                  id={4}
                  text="Which letter is G?"
                  options={[
                    { value: "4f", label: "First" },
                    { value: "0f", label: "Second" },
                  ]}
                  imgSrc={["/assets/g.jpg", "/assets/o.png"]}
                  audioSrc={[]}
                />

                <Question
                  id={5}
                  text="Which letter CAT starts with?"
                  options={[
                    { value: "0g", label: "K" },
                    { value: "0h", label: "S" },
                    { value: "4g", label: "C" },
                  ]}
                  imgSrc={["/assets/cat.jpeg"]}
                  audioSrc={[]}
                />

                <Question
                  id={6}
                  text="What is the smaller version of this letter?"
                  options={[
                    { value: "0i", label: "d" },
                    { value: "4h", label: "b" },
                  ]}
                  imgSrc={["/assets/b.png"]}
                  audioSrc={[]}
                />

                <Question
                  id={7}
                  text="What do you hear?"
                  options={[
                    { value: "0j", label: "F" },
                    { value: "4i", label: "S" },
                  ]}
                  imgSrc={[]}
                  audioSrc={["/assets/s.mp3"]}
                />

                <Question
                  id={8}
                  text="What do you see in the picture?"
                  options={[
                    { value: "0k", label: "DOG" },
                    { value: "4j", label: "GOD" },
                  ]}
                  imgSrc={["/assets/god.jpeg"]}
                  audioSrc={[]}
                />

                <Question
                  id={9}
                  text="Which hand is left and Which hand is right?"
                  options={[
                    {
                      value: "4k",
                      label: "First one is right and next one is left",
                    },
                    {
                      value: "0l",
                      label: "First one is left and next one is right",
                    },
                  ]}
                  imgSrc={["/assets/right.jpeg", "/assets/left.jpeg"]}
                  audioSrc={[]}
                />

                <Question
                  id={10}
                  text="What do you hear?"
                  options={[
                    { value: "0m", label: "CAKE" },
                    { value: "4l", label: "LAKE" },
                    { value: "0n", label: "TAKE" },
                    { value: "0o", label: "FAKE" },
                  ]}
                  imgSrc={[]}
                  audioSrc={["/assets/lake.mp3"]}
                />
                
              </div>
              <div className="flex justify-center p-2 m-10">
                <button
                  className="w-40 h-10 px-2 text-white bg-blue-500 rounded shadow-xl"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <NavBar />
        </div>
        <div>
          <div className="parallax1">
            <div id="warning">
              <center>
                This quiz is specially designed for students to test if they are
                dyslexic or not. Students are advised to attempt all the questions
                patiently under the surveillance of an elder.
                <br />
                ALL THE BEST JUNIOR!
              </center>
            </div>
          </div>
          <div className="main">
            <div className="question">
              <center>
              <div className="text-center">
              <p className="mb-2 text-lg font-semibold"><b>Note:</b>Model Api is currently deployed on Render so it take initial load time</p>
              <p className="mb-2 text-lg ml-4 font-semibold">It takes at most 5 minutes</p>
              <p className="mb-4 text-lg"> <span className="font-semibold">Result:</span> {result}</p>
            </div>
              </center>
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </>
    );
  }
}

export default Quiz;
