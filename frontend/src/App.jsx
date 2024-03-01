import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import { GoogleOAuthProvider } from "@react-oauth/google";

// components imports
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Test from './pages/Test/Test.jsx'
import Contact from "./pages/Contact.jsx";
import TestRecord from './pages/TestRecord.jsx'
import ResponseContact from "./pages/ResponseContact.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import UpdateUser from './pages/Update/UpdateUser.jsx'
import UpdatePass from './pages/Update/UpdatePass.jsx'
import Team from './pages/Team/Team.jsx'

function App() {
  const clientId =
    "715277608713-sgtqudvfba9sr26avhok47041iskncu4.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/test" element={<Test />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/testrecord" element={<TestRecord />} />
            <Route exact path="/responseContact" element={<ResponseContact/>} />
            <Route exact path="/profile" element={<Profile/>} />
            <Route exact path="/updatePass" element={<UpdatePass/>} />
            <Route exact path="/updateUser" element={<UpdateUser/>} />
            <Route exact path="/team" element={<Team/>} />


          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
