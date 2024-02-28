import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function Test() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <span className="display-6 fw-bold">No Test Here.</span>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Test;
