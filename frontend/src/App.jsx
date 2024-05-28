// eslint-disable-next-line no-unused-vars
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
import History from "./pages/History/History.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import LogInWarning from "./pages/LogInWarning.jsx";
// import About from "./pages/About/About.jsx";

import Survey from "./pages/Prediction/Survey/Survey.jsx";
import ImagePrediction from "./pages/Prediction/ImagePrediction/ImagePrediction.jsx";
import Quiz from "./pages/Prediction/Quiz/Quiz.jsx";
import IntegratedTest from './pages/Prediction/IntegratedTest/IntegratedTest.jsx'
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
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/test" element={<Test />} />
            <Route exact path="/history" element={authUser? <History />: <LogInWarning />} />
            <Route exact path="/profile" element={authUser?<Profile />: <LogInWarning />} />
            {/* <Route exact path="/" element={authUser?<Home />: <Navigate to="/login" />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/test" element={authUser? <Test />: <Navigate to="/login" />} />
            <Route exact path="/history" element={authUser? <History />: <Navigate to="/login" />} />
            <Route exact path="/profile" element={authUser?<Profile />: <Navigate to="/login" />} /> */}
            {/* <Route exact path="/about" element={<About />} /> */}

            <Route
              exact
              path="/test/imagePrediction"
              element={<ImagePrediction />}
            />
            <Route exact path="/test/survey" element={<Survey />} />
            <Route exact path="/test/quiz" element={<Quiz />} />
            <Route exact path="/test/integratedTest" element={<IntegratedTest />} />
          </Routes>
        </div>
      </Router>
      <Toaster />
    </GoogleOAuthProvider>
  );
}

export default App;
