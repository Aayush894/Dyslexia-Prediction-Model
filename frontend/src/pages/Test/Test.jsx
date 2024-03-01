import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Test() {
  const [credentials, setCredentials] = useState({ vocabScore: "", memScore: "", speedScore: "", visualScore: "", audioScore: "", surveyScore: "" });
  const navigate = useNavigate();

  const url = "";
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials) ;

    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     vocabScore: credentials.vocabScore,
    //     memScore: credentials.memScore,
    //     speedScore: credentials.speedScore, 
    //     visualScore:credentials.visualScore ,
    //     audioScore: credentials.audioScore,
    //     surveyScore: credentials.surveyScore,
    //   }),
    // });

    // const json = await response.json();

    // if (!json.success) {
    //   alert("Enter Valid Credentials");
    // } else {
    //   localStorage.setItem("userEmail", credentials.email);
    //   localStorage.setItem("authToken", json.authToken);
    //   navigate("/");
    // }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="vh-100 d-flex flex-column">
        <NavBar />
        <div className=" d-flex flex-column bd-highlight mb-1 flex-grow-1 justify-content-center align-items-center">
        <span className="p-2 bd-highlight display-5">Please Enter the following Score</span>
        <span className="p-2 bd-highlight dipalay-6">NOTE: Enter the following Score between 0 and 1</span>
        </div>
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="formmGroupExampleInput">Language Vocubulary Score</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Example input"
                name="vocabScore" // Added name attribute
                value={credentials.vocabScore} // Added value attribute
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Memory Score</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Another input"
                name="memScore" // Added name attribute
                value={credentials.memScore} // Added value attribute
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Speed Score</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Another input"
                name="speedScore" // Added name attribute
                value={credentials.speedScore} // Added value attribute
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Visual Discrimination Score</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Another input"
                name="visualScore" // Added name attribute
                value={credentials.visualScore} // Added value attribute
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Audio Discrimination Score</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Another input"
                name="audioScore" // Added name attribute
                value={credentials.audioScore} // Added value attribute
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Survey Score</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Another input"
                name="surveyScore" // Added name attribute
                value={credentials.surveyScore} // Added value attribute
                onChange={onChange}
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Test;
