import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

const LogInWarning = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <span className="display-6 fw-bold">LogIn to access!</span>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default LogInWarning;
