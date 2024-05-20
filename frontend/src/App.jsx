import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

// components imports
import Home from "./pages/Home/Home.jsx";
import LoginPage from "./pages/LoginSignup/LoginPage.jsx";
import Signup from "./pages/LoginSignup/SignupPage.jsx";
import Test from "./pages/Test/Test.jsx";
import TestRecord from "./pages/TestRecord.jsx";
import Profile from "./pages/Profile/Profile.jsx";
// import About from "./pages/About/About.jsx";

import Survey from "./pages/Prediction/Survey/Survey.jsx";
import ImagePrediction from "./pages/Prediction/ImagePrediction/ImagePrediction.jsx";
import Quiz from "./pages/Prediction/Quiz/Quiz.jsx";
import { useAuthContext } from "./context/AuthContext.jsx";

function App() {
  const clientId =
    "715277608713-sgtqudvfba9sr26avhok47041iskncu4.apps.googleusercontent.com";
  
    const {authUser} = useAuthContext(); 

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={authUser?<Home />: <Navigate to="/login" />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/test" element={authUser? <Test />: <Navigate to="/login" />} />
            <Route exact path="/testrecord" element={authUser? <TestRecord />: <Navigate to="/login" />} />
            <Route exact path="/profile" element={authUser?<Profile />: <Navigate to="/login" />} />
            {/* <Route exact path="/about" element={<About />} /> */}

            <Route
              exact
              path="/test/imagePrediction"
              element={<ImagePrediction />}
            />
            <Route exact path="/test/survey" element={<Survey />} />
            <Route exact path="/test/quiz" element={<Quiz />} />
          </Routes>
        </div>
      </Router>
      <Toaster />
    </GoogleOAuthProvider>
  );
}

export default App;
