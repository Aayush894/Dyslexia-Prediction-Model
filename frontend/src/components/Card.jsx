
import { useEffect} from "react";

export default function Card(){

  useEffect(() => {
  }, []);
  
  return (
    <>
      <div
        className="card mt-3 embed-responsive embed-responsive-16by9"
        style={{
          width: "18rem",
          fontFamily: "ariel",
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
    </>
  );
}
