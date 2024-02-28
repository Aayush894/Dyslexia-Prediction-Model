import { useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
      }
    })
    .then((res) => {
      console.log(res); 
      if (res.status > 199 && res.status < 300) {
        navigate("/responseContact"); 
      }
    })
    .catch((err) => {
      console.log("Error occur while fetching sendmail api", err) ; 
    })
  }

  return (
    <div className="vh-100 d-flex flex-column">
      <NavBar />
      <section className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="col-md-12 mx-auto shadow-sm">
            <div className="col-md-6 mx-auto p-6">
              <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
              <p className="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.</p>
              <form id="contact-form" name="contact-form" ref={form} onSubmit={sendEmail}>
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <div className="md-form">
                      <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} />
                      <label htmlFor="name" className="">Your name</label>
                    </div>
                  </div>
                  <div className="col-md-12 mb-4">
                    <div className="md-form">
                      <input type="text" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                      <label htmlFor="email" className="">Your email</label>
                    </div>
                  </div>
                  <div className="col-md-12 mb-4">
                    <div className="md-form">
                      <input type="text" id="subject" name="subject" className="form-control" value={formData.subject} onChange={handleChange} />
                      <label htmlFor="subject" className="">Subject</label>
                    </div>
                  </div>
                  <div className="col-md-12 mb-4">
                    <div className="md-form">
                      <textarea type="text" id="message" name="message" rows="2" className="form-control md-textarea" value={formData.message} onChange={handleChange}></textarea>
                      <label htmlFor="message">Your message</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="text-center text-md-left">
                      <button type="submit" className="btn btn-primary">Send</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className=" mt-4">
              <ul className="list-unstyled d-flex flex-column align-items-center">
                <li><i className="fas fa-map-marker-alt"></i>
                  <p>@Team Disgraphia Prediction</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
