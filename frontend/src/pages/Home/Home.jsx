/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

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

  const sendEmail = async () => {
    await fetch(`http://localhost:5000/api/sendemail`, {
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
          navigate("/responseContact");
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
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Your story starts with us.
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                This is a simple example of a Landing Page you can build using
                Material Tailwind. It features multiple components based on the
                Tailwind CSS and Material Design by Google.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"></div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                <FingerPrintIcon className="h-8 w-8 text-white " />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Lorem ipsum dolor sit amet.
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                maiores iure ullam itaque soluta doloribus quia ad quaerat
                dolore dignissimos quasi at alias cumque veritatis eum ex,
                aspernatur inventore pariatur.
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
                eveniet rem sed minus rerum, nemo molestiae reiciendis cum
                placeat perferendis, harum beatae velit? Illo minima sed, totam
                laborum dolorum similique.
              </Typography>
              <Button variant="filled">read more</Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/teamwork.png"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    Enterprise
                  </Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                  >
                    Top Notch Services
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Info */}
      <div className="py-5 team4">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-md-7 text-center">
              <h3 className="mb-3 display-5">Team</h3>
              <h6 className="subtitle">
                You can relay on our amazing features list and also our customer
                services will be great experience for you without doubt and in
                no-time
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 mb-4 shadow-sm">
              <div className="row">
                <div className="col-md-12">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
                    alt="wrapkit"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-12 text-center">
                  <div className="pt-2">
                    <h5 className="mt-4 font-weight-medium mb-0">
                      Aayush Kumar Shrivastava
                    </h5>
                    <h6 className="subtitle mb-3">Backend Developer</h6>
                    <p>
                      You can relay on our amazing features list and also our
                      customer services will be great experience.
                    </p>
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <Link
                          to="/"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-facebook"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="/"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-twitter"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-instagram"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-behance"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 mb-4 shadow-sm">
              <div className="row">
                <div className="col-md-12">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
                    alt="wrapkit"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-12 text-center">
                  <div className="pt-2">
                    <h5 className="mt-4 font-weight-medium mb-0">
                      Kartik Verma
                    </h5>
                    <h6 className="subtitle mb-3">Frontend Development</h6>
                    <p>
                      You can relay on our amazing features list and also our
                      customer services will be great experience.
                    </p>
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-facebook"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-twitter"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-instagram"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-behance"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 mb-4 shadow-sm">
              <div className="row">
                <div className="col-md-12">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
                    alt="wrapkit"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-12 text-center">
                  <div className="pt-2">
                    <h5 className="mt-4 font-weight-medium mb-0">
                      Archit Goel
                    </h5>
                    <h6 className="subtitle mb-3">Machine Learning</h6>
                    <p>
                      You can relay on our amazing features list and also our
                      customer services will be great experience.
                    </p>
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-facebook"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-twitter"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-instagram"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-behance"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 mb-4 shadow-sm">
              <div className="row">
                <div className="col-md-12">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
                    alt="wrapkit"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-12 text-center">
                  <div className="pt-2">
                    <h5 className="mt-4 font-weight-medium mb-0">
                      Abhishek Verma
                    </h5>
                    <h6 className="subtitle mb-3">Machine Learning</h6>
                    <p>
                      You can relay on our amazing features list and also our
                      customer services will be great experience.
                    </p>
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-facebook"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-twitter"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-instagram"></i>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          to="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-behance"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact Info */}
      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <form
            className="mx-auto w-full mt-12 lg:w-5/12"
            ref={form}
            onSubmit={sendEmail}
          >
            <p className="text-center display-5">Contact us</p>
            <p className="text-center w-responsive mx-auto mb-5">
              Do you have any questions? Please do not hesitate to contact us
              directly.
            </p>
            <div className="mb-8 flex gap-8">
              <Input
                variant="outlined"
                size="lg"
                id="name"
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                variant="outlined"
                size="lg"
                id="email"
                name="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="pb-10">
              <Input
                variant="outlined"
                size="lg"
                id="subject"
                name="subject"
                label="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="pb-10">
            <Textarea
              variant="outlined"
              size="lg"
              label="Message"
              rows={8}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                  <div className=" mt-4"></div>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            
            <div className="text-center text-md-left">
                <button type="submit" className="text-white bg-indigo-600 rounded-md lg:ml-5 btn btn-primary">Submit</button>
            </div>
            
          </form>
        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
