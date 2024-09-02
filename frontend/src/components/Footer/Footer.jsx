import { Link } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 mt-5">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 md:col-span-1">
              <img
                src="/assets/logo.png"
                alt="Your Company"
                className="h-8 w-auto"
              />
              <p className="mt-4 text-gray-300">
                DyslexiLens is a platform that helps you to identify the likelihood of
                Dyslexia. We provide you with the best test results.
              </p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-bold text-white">Quick Links</h3>
              <ul className="mt-4">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-gray-300 hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="text-gray-300 hover:text-white">
                    Signup
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-bold text-white">Contact Us</h3>
              <ul className="mt-4">
                <li>
                  <Link to="mailto:" className="text-gray-300 hover:text-white">
                    aayush894@gmail.com
                  </Link>
                </li>
                <li>
                  <Link to="tel:" className="text-gray-300 hover:text-white">
                    +91 1234567890
                  </Link>
                </li>

                <li>
                  <Link
                    to="https://www.google.com/maps/"
                    className="text-gray-300 hover:text-white"
                  >
                    A-8 Sector 62, Noida, India
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-bold text-white">Social</h3>
              <ul className="mt-4">
                <li>
                  <Link
                    to="https://facebook.com"
                    className="text-gray-300 hover:text-white m-2"
                  >
                    <FacebookIcon />
                  </Link>
                  <Link
                    to="https://twitter.com"
                    className="text-gray-300 hover:text-white m-2"
                  >
                    <XIcon />
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://instagram.com"
                    className="text-gray-300 hover:text-white m-2"
                  >
                    <InstagramIcon />
                  </Link>
                  <Link
                    to="https://github.com"
                    className="text-gray-300 hover:text-white m-2"
                  >
                    <GitHubIcon />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="m-2">
        <Link className="text-white bold" to="">
        © 2024 Copyright @Team DysLexiLens
        </Link>
      </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
