/* eslint-disable react/no-unescaped-entities */
import { useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Banner from "./Banner.jsx";
import toast from 'react-hot-toast'; 

export function Home() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const form = useRef();

  const sendEmail = async (event) => {
    event.preventDefault();
    
    const isValidateRequest = isValidate(formData);
    if (!isValidateRequest) {
      return;
    }

    await fetch('/api/sendemail', {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status > 199 && res.status < 300) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Error occur while fetching sendmail api", err);
      });
  };

  return (
    <>
      <div>
        <NavBar />
      </div>

      <div className="p-1 bg-gray-300">
        <Banner />
        <br />
      </div>

      {/* Team Info */}
      <section className="py-5" id="team">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-md-7 text-center">
              <h3 className="mb-3 display-5">Team</h3>
              <h6 className="subtitle">
                You can rely on our amazing features list and also our customer
                services will be a great experience for you without doubt and in
                no time...
              </h6>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
              <div className="card shadow-sm">
                <img
                  src="/assets/Profile_pic.png"
                  alt="Aayush Kumar Shrivastava"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title font-weight-medium mb-0">
                    Aayush Kumar Shrivastava
                  </h5>
                  <p className="card-text">Backend Developer</p>
                  <ul className="list-inline mb-2">
                    <li className="list-inline-item">
                      <Link to="#" className="text-decoration-none d-block">
                        <LinkedInIcon fontSize="medium" />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#" className="text-decoration-none d-block">
                        <GitHubIcon fontSize="medium" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
              <div className="card shadow-sm">
                <img
                  src="/assets/Kartik.jpg"
                  alt="Kartik Verma"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title font-weight-medium mb-0">
                    Kartik Verma
                  </h5>
                  <p className="card-text">Frontend Developer</p>
                  <ul className="list-inline mb-2">
                    <li className="list-inline-item">
                      <Link to="#" className="text-decoration-none d-block">
                        <LinkedInIcon fontSize="medium" />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#" className="text-decoration-none d-block">
                        <GitHubIcon fontSize="medium" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
              <div className="card shadow-sm">
                <img
                  src="/assets/Abhishek.jpg"
                  alt="Abhishek Verma"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title font-weight-medium mb-0">
                    Abhishek Verma
                  </h5>
                  <p className="card-text">Machine Learning</p>
                  <ul className="list-inline mb-2">
                    <li className="list-inline-item">
                      <Link to="#" className="text-decoration-none d-block">
                        <LinkedInIcon fontSize="medium" />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#" className="text-decoration-none d-block">
                        <GitHubIcon fontSize="medium" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
              <div className="card shadow-sm">
                <img
                  src="/assets/Archit1.jpg"
                  alt="Archit Goel"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title font-weight-medium mb-0">
                    Archit Goel
                  </h5>
                  <p className="card-text">Machine Learning</p>
                  <ul className="list-inline mb-2">
                    <li className="list-inline-item">
                      <Link to="#" className="text-decoration-none d-block">
                        <LinkedInIcon fontSize="medium" />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#" className="text-decoration-none d-block">
                        <GitHubIcon fontSize="medium" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* contact Info */}
      <div className="bg-gray-300">
        <div className="container mx-0 pt-16 pb-20 mx-auto">
          <h3 className=" row justify-content-center mb-12 display-5">
            Contact us
          </h3>
          <div className="lg:flex">
            <div className="xl:w-2/5 lg:w-2/5 py-16 xl:rounded-bl rounded-tl rounded-tr xl:rounded-tr-none bg-blue-400">
              <div className="xl:w-5/6 xl:px-0 px-8 mx-auto">
                <h1 className="xl:text-4xl text-3xl pb-4 text-white font-bold">
                  Get in touch
                </h1>
                <p className="text-xl text-white pb-8 leading-relaxed font-normal lg:pr-4">
                  Got a question about us? Are you interested in partnering with
                  us? Have some suggestions or just want to say Hi? Just contact
                  us. We are here to asset you.
                </p>
                <div className="flex pb-4 items-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-phone-call"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M4 4h5l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v5a1 1 0 0 1 -1 1a16 16 0 0 1 -16 -16a1 1 0 0 1 1 -1" />
                      <path d="M15 7a2 2 0 0 1 2 2" />
                      <path d="M15 3a6 6 0 0 1 6 6" />
                    </svg>
                  </div>
                  <p className="pl-4 text-white text-base">(+91)8448861352</p>
                </div>
                <div className="flex items-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-mail"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#FFFFFF"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <rect x={3} y={5} width={18} height={14} rx={2} />
                      <polyline points="3 7 12 13 21 7" />
                    </svg>
                  </div>
                  <p className="pl-4 text-white text-base">
                    team.dyslexilens@gmail.com
                  </p>
                </div>
                <p className="text-lg text-white pt-10 tracking-wide">
                  Kiet Group of Institutions <br />
                  Muradnagar, Ghaziabad
                </p>
              </div>
            </div>
            <div className="xl:w-3/5 lg:w-3/5 bg-gray-300 h-full pt-5 pb-5 xl:pr-5 xl:pl-0 rounded-tr rounded-br">
              <form
                id="contact"
                className="bg-white py-4 px-8 rounded-tr rounded-br"
                ref={form}
                onSubmit={sendEmail}
              >
                <h1 className="text-4xl text-gray-800 font-extrabold mb-6">
                  Enter Details
                </h1>
                <div className="block xl:flex w-full flex-wrap justify-between mb-6">
                  <div className="w-2/4 max-w-xs mb-6 xl:mb-0">
                    <div className="flex flex-col">
                      <label
                        htmlFor="name"
                        className="text-grey-800 text-sm font-semibold leading-tight tracking-normal mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="focus:outline-none focus:border focus:border-indigo-700 font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border bg-white"
                        autoComplete="true"
                      />
                    </div>
                  </div>
                  <div className="w-2/4 max-w-xs xl:flex xl:justify-end">
                    <div className="flex flex-col">
                      <label
                        htmlFor="email"
                        className="text-gray-800 text-sm font-semibold leading-tight tracking-normal mb-2"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="focus:outline-none focus:border focus:border-indigo-700 font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border bg-white"
                        autoComplete="true"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-wrap">
                  <div className="w-2/4 max-w-xs">
                    <div className="flex flex-col">
                      <label
                        htmlFor="subject"
                        className="text-gray-800 text-sm font-semibold leading-tight tracking-normal mb-2"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        className="focus:outline-none focus:border focus:border-indigo-700 font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border bg-white"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full mt-6">
                  <div className="flex flex-col">
                    <label
                      className="text-sm font-semibold text-gray-800 mb-2"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="border-gray-300 border mb-4 rounded py-2 text-sm outline-none resize-none px-3 focus:border focus:border-indigo-700 bg-white"
                      rows={5}
                      autoComplete="true"
                      id="message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="focus:outline-none bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm leading-6"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Home;


const isValidate = (formData) => { 
  if (!formData.name) {
    toast.error("Please enter your name");
    return false;
  }
  if (!formData.email || !formData.email.includes("@gmail.com")){
    toast.error("Please enter your email");
    return false;
  }
  if (!formData.subject) {
    toast.error("Please enter your phone number");
    return false;
  }
  if (!formData.message) {
    toast.error("Please enter your message");
    return false;
  }

  return true;
}