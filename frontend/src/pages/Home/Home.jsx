import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Corousel from "../../components/Corousal";

export default function Home() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" ,marginTop :"50px", padding: "20px"}}>
        <div style={{ width: "100%" }}>
          <Corousel />
        </div>

      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
