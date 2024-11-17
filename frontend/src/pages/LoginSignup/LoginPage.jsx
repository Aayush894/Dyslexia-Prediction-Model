import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import Swal from 'sweetalert2'

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const {setAuthUser} = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (!json.success) {
      toast.error("Invalid Credentials. Please try again.");
    } else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      setAuthUser(json.authToken); 

      Swal.fire({
        title: 'Success!',
        text: 'Login Successful!',
        icon: 'success',
        confirmButtonText: 'Cool',
        timer: 2500
      })

      console.log(`API Wake-up Call: ${import.meta.env.VITE_BACKEND_URL}/api/wakeupcall`);

      const response = fetch(`${import.meta.env.VITE_BACKEND_URL}/api/wakeupcall`, {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
         },
      })

      if (response.success) {
        toast.success("API Wake-up Call Success") 
      } else {
        toast.error("API Wake-up Call Failed")
      }
      navigate("/");
    }
  };

  const onLoginSuccess = async (res) => {
    const decoded = jwtDecode(String(res.credential));
    const userEmail = decoded.email;
    const isVerified = decoded.email_verified;

    if (!isVerified) {
      Swal.fire({
        title: 'Error!',
        text: 'Email not verified',
        icon: 'error',
        confirmButtonText: 'Cool',
        timer: 2500
      })
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/googlelogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    });

    const json = await response.json();
    if (!json.success) {
      toast.error("Login Failed. Please try again.");
    } else {
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("authToken", json.authToken);
      setAuthUser(json.authToken);
      
      Swal.fire({
        title: 'Success!',
        text: 'Google Login Successful!',
        icon: 'success',
        confirmButtonText: 'Cool',
        timer: 2500
      });
      navigate("/");
    }
  };

  const onLoginError = (error) => {
    toast.error("Google Login Failed");
    console.log("Google Login Failed", error);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center space-x-2 text-4xl font-medium text-indigo-500 dark:text-gray-100 font-sans"
          >
            DysLexiLens
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="justify-content-center mx-20 p-5">
              <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} placeholder="Google Signin"/>
            </div>
            <div>
              <p className="text-center">Or</p>
            </div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    value={credentials.email}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={credentials.password}
                    onChange={onChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
}
