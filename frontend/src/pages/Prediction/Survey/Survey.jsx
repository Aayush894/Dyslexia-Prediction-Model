/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Footer from "../../../components/Footer";
import NavBar from "../../../components/NavBar/NavBar";
import { useState, useRef} from "react";
import "./survey.css";



function Question({ id, text, options }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (optionValue) => {
    setSelectedOption((prevValue) =>
      prevValue === optionValue ? null : optionValue
    );
  };

  const handleClickQuestion = () => {
    setSelectedOption(null); // Reset selected option when the question is clicked
  };

  return (
    <>
      <span
        id={`question-${id}`}
        onClick={handleClickQuestion}
        style={{ cursor: "pointer" }}
      >
        Q-{id} {text}
      </span>
      <br />
      <br />
      <div className="content">
        {options.map((option) => (
          <React.Fragment key={`${id}-${option.value}`}>
            <input
              type="radio"
              id={`${id}-${option.value}`}
              name={`q${id}`}
              value={option.value}
              disabled={
                selectedOption !== null && selectedOption !== option.value
              }
              checked={selectedOption === option.value}
              onChange={() => handleOptionClick(option.value)}
            />
            <label
              htmlFor={`${id}-${option.value}`}
              onClick={() => handleOptionClick(option.value)}
              style={{ cursor: "pointer" }}
            >
              {option.label}
            </label>
            <br />
          </React.Fragment>
        ))}
      </div>
      <br />
    </>
  );
}


function Survey() {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (form instanceof HTMLFormElement) {
      const formData = new FormData(form);
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      // Add your form submission logic here
      console.log("Form submitted!");
    } else {
      console.error("Form element not found");
    }
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div>
        <div className="parallax1">
          <div id="warning">
            <center>
              This survey is specially designed for parents and teachers to test
              if their child/student is dyslexic or not. This survey is based on
              your keen observation towards your child/student.
            </center>
          </div>
        </div>
        <div className="main">
          <form name="survey" ref={formRef} onSubmit={handleSubmit}>
            <div className="question">
              <Question
                id={1}
                text="Did your child struggle to learn to count?"
                options={[
                  { value: 0, label: "Yes-frequently" },
                  { value: 2, label: "Sometimes" },
                  { value: 4, label: "No-never" },
                ]}
              />

              <Question
                id={2}
                text="Does he/she say numbers out of order, long after peers have mastered this skill?"
                options={[
                  { value: 0, label: "Yes-frequently" },
                  { value: 2, label: "Sometimes" },
                  { value: 4, label: "No-never" },
                ]}
              />

              <Question
                id={3}
                text="Does your child not seem to understand the connection between the symbol '4' and the word 'four'? Does he make mistakes when reading or following directions involving numbers, words, and symbols?"
                options={[
                  { value: 0, label: "Yes-frequently" },
                  { value: 2, label: "Sometimes" },
                  { value: 4, label: "No-never" },
                ]}
              />

              <Question
                id={4}
                text="Does your child struggle to connect the concept of numbers to real-world items? When you ask him how many cookies are left, for example, does he seem confused by the question or answer incorrectly?"
                options={[
                  { value: 0, label: "Yes-frequently" },
                  { value: 2, label: "Sometimes" },
                  { value: 4, label: "No-never" },
                ]}
              />

              <Question
                id={5}
                text="Does your child not seem to understand the difference between adding and subtracting? Does she confuse the + and - symbols when completing math problems?"
                options={[
                  { value: 0, label: "Yes-frequently" },
                  { value: 2, label: "Sometimes" },
                  { value: 4, label: "No-never" },
                ]}
              />

              <Question
                id={6}
                text="Does your child still count on his fingers past third grade?"
                options={[
                  { value: 0, label: "Yes-frequently" },
                  { value: 2, label: "Sometimes" },
                  { value: 4, label: "No-never" },
                ]}
              />

              <Question
                id={7}
                text="Difficulty sustaining attention; seems 'hyper' or 'daydreamer'?"
                options={[
                  { value: 0, label: "Yes" },
                  { value: 4, label: "No" },
                  { value: 2, label: "Unknown" },
                ]}
              />

              <Question
                id={8}
                text="Confused by letters, numbers, words, sequences, or verbal explanations?"
                options={[
                  { value: 0, label: "Yes" },
                  { value: 4, label: "No" },
                  { value: 2, label: "Unknown" },
                ]}
              />

              <Question
                id={9}
                text="Reads and rereads with little comprehension?"
                options={[
                  { value: 0, label: "Yes" },
                  { value: 4, label: "No" },
                  { value: 2, label: "Unknown" },
                ]}
              />

              <Question
                id={10}
                text="Difficulty putting thoughts into words; speaks in halting phrases; leaves sentences incomplete?"
                options={[
                  { value: 0, label: "Yes" },
                  { value: 4, label: "No" },
                  { value: 2, label: "Unknown" },
                ]}
              />

              <Question
                id={11}
                text="Can count, but has difficulty counting objects and dealing with money?"
                options={[
                  { value: 0, label: "Yes" },
                  { value: 4, label: "No" },
                  { value: 2, label: "Unknown" },
                ]}
              />

              <Question
                id={12}
                text="Does your child worry for sequences, facts, and information that were not taught before?"
                options={[
                  { value: 0, label: "Yes" },
                  { value: 4, label: "No" },
                  { value: 2, label: "Unknown" },
                ]}
              />

              <Question
                id={13}
                text="Does your child complain of dizziness, headaches, or stomach aches while reading?"
                options={[
                  { value: 0, label: "Yes" },
                  { value: 4, label: "No" },
                  { value: 2, label: "Unknown" },
                ]}
              />

              <Question
                id={14}
                text="Is reading extremely difficult for your child? (Below grade or age level)"
                options={[
                  { value: 0, label: "Yes" },
                  { value: 4, label: "No" },
                  { value: 2, label: "Unknown" },
                ]}
              />

              <Question
                id={15}
                text="Is his spelling ability poor? Letters missed, reversed, etc.?"
                options={[
                  { value: 0, label: "Yes" },
                  { value: 4, label: "No" },
                  { value: 2, label: "Unknown" },
                ]}
              />

              <Question
                id={16}
                text="Is it difficult for him to rhyme words? (If you are not sure, play a rhyming game with your child or student)"
                options={[
                  { value: 0, label: "Yes" },
                  { value: 4, label: "No" },
                  { value: 2, label: "Unknown" },
                ]}
              />

              <Question
                id={17}
                text="Is there difficulty telling time on a clock with hands and/or tying shoes with laces?"
                options={[
                  { value: 0, label: "Yes" },
                  { value: 4, label: "No" },
                  { value: 2, label: "Unknown" },
                ]}
              />

              <Question
                id={18}
                text="Is there difficulty finding the right words while speaking? Lots of ums, ahs, 'those things', and 'that stuff'?"
                options={[
                  { value: 0, label: "Yes" },
                  { value: 4, label: "No" },
                  { value: 2, label: "Unknown" },
                ]}
              />

              <Question
                id={19}
                text="Pauses, repeats, or frequent mistakes when reading aloud?"
                options={[
                  { value: 0, label: "Yes" },
                  { value: 4, label: "No" },
                  { value: 2, label: "Unknown" },
                ]}
              />

              <Question
                id={20}
                text="Unusually high or low tolerance for pain?"
                options={[
                  { value: 0, label: "Yes" },
                  { value: 4, label: "No" },
                  { value: 2, label: "Unknown" },
                ]}
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
}

export default Survey;
