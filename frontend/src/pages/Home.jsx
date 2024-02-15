import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Corousel from "../components/Corousal";

export default function Home() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" ,marginTop:"5px"}}>
        <div style={{ width: "100%" }}>
          <Corousel />
        </div>

        <div style={{ width: "90%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          
            <div
              key={0}
              className="card mt-3 embed-responsive embed-responsive-16by9"
              style={{
                width: "20%", // Each card covers 25% of the width
                margin: "10px", // Added margin for spacing between cards
                fontFamily: "Arial",
                maxHeight: "360px",
              }}
            >
              <img
                className="card-img-top embed-responsive-item"
                src={undefined}
                style={{ height: "120px", objectFit: "fill" }}
                alt="Card image cap"
              />
            </div>
            <div
              key={1}
              className="card mt-3 embed-responsive embed-responsive-16by9"
              style={{
                width: "20%", // Each card covers 25% of the width
                margin: "10px", // Added margin for spacing between cards
                fontFamily: "Arial",
                maxHeight: "360px",
              }}
            >
              <img
                className="card-img-top embed-responsive-item"
                src={undefined}
                style={{ height: "120px", objectFit: "fill" }}
                alt="Card image cap"
              />
            </div>
            <div
              key={2}
              className="card mt-3 embed-responsive embed-responsive-16by9"
              style={{
                width: "20%", // Each card covers 25% of the width
                margin: "10px", // Added margin for spacing between cards
                fontFamily: "Arial",
                maxHeight: "360px",
              }}
            >
              <img
                className="card-img-top embed-responsive-item"
                src={undefined}
                style={{ height: "120px", objectFit: "fill" }}
                alt="Card image cap"
              />
            </div>
            <div
              key={3}
              className="card mt-3 embed-responsive embed-responsive-16by9"
              style={{
                width: "20%", // Each card covers 25% of the width
                margin: "10px", // Added margin for spacing between cards
                fontFamily: "Arial",
                maxHeight: "360px",
              }}
            >
              <img
                className="card-img-top embed-responsive-item"
                src={undefined}
                style={{ height: "120px", objectFit: "fill" }}
                alt="Card image cap"
              />
            </div>
    
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
