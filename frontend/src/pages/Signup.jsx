/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';

function Signup() {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: ""});

    const navigate = useNavigate();

    const onLoginSuccess = (res) => {
        const decoded = jwtDecode(String(res.credential));
        console.log(decoded);
    };
    
    const onLoginError = (error) => {
        console.log("Login Failed", error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // synthetic event. 
        const response = await fetch("http://localhost:5000/api/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
        });

        const json = await response.json()
        // console.log(json) ; 

        if (!json.success) {
            alert("Enter Valid Credentials")
        }
        navigate("/login");
    };

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

    return (
        <>
        <section className="vh-100">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mt-3">
                <form onSubmit={handleSubmit}> 
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    

                    <GoogleLogin
                      onSuccess={onLoginSuccess}
                      onError={onLoginError}
                    />
                  </div>
  
                  <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="form3Example2"
                      className="form-control form-control-lg"
                      placeholder="Enter a valid username"
                      name="name" // Added name attribute
                      value={credentials.name} // Added value attribute
                      onChange={onChange} // Added onChange handler
                    />
                    <label className="form-label" htmlFor="form3Example2">
                      Username
                    </label>
                  </div>
                  
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control form-control-lg"
                      placeholder="Enter a valid email address"
                      name="email" // Added name attribute
                      value={credentials.email} // Added value attribute
                      onChange={onChange} // Added onChange handler
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                  </div>
  
                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                      name="password" // Added name attribute
                      value={credentials.password} // Added value attribute
                      onChange={onChange} // Added onChange handler
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                  </div>
  
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="submit" // Changed button type to submit
                      className="btn btn-primary btn-lg"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} // Added double curly braces for inline styles
                    >
                      SignUp
                    </button>

                    <Link to="/login" className="m-3 btn link-danger">
                        Already a User
                    </Link>
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        <div> 
          <Footer />
        </div>
      </>
    );
}

export default Signup;
