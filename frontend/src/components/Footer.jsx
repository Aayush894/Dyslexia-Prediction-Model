import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
    
    <footer className="text-white text-center text-lg-start fixed-bottom" style={{backgroundColor: "#C0C0C0"}}>
        <div
        className="text-center p-1"
      >
        © 2024 Copyright
        <Link className="text-dark bold" to="">
        @Disgraphia Prediction Model
        </Link>
      </div>
    </footer>
    </>
  );
}

export default Footer;
