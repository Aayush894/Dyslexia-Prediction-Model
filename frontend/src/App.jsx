import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import { GoogleOAuthProvider } from "@react-oauth/google";

// components imports
import Home from "./pages/Home/Home.jsx";
import LoginPage from "./pages/LoginSignup/LoginPage.jsx";
import Signup from "./pages/Signup.jsx";
import Test from "./pages/Test/Test.jsx";
import TestRecord from "./pages/TestRecord.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import UpdateUser from "./pages/Update/UpdateUser.jsx";
import UpdatePass from "./pages/Update/UpdatePass.jsx";
import About from "./pages/About/About.jsx";

import AudioPrediction from './pages/Prediction/AudioPrediction.jsx'
import ImagePrediction from './pages/Prediction/ImagePrediction.jsx'
import TextPrediction from './pages/Prediction/TextPrediction.jsx'

function App() {
  const clientId =
    "715277608713-sgtqudvfba9sr26avhok47041iskncu4.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/test" element={<Test />} />
            <Route exact path="/testrecord" element={<TestRecord />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/updatePass" element={<UpdatePass />} />
            <Route exact path="/updateUser" element={<UpdateUser />} />
            <Route exact path="/about" element={<About />} />

            <Route exact path="/test/imagePrediction" element={<ImagePrediction />} />
            <Route exact path="/test/audioPrediction" element={<AudioPrediction />} />
            <Route exact path="/test/textPrediction" element={<TextPrediction />} />

          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
