import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../../components/Footer/Footer";
import "./profile.css";

const Profile = () => {
  const url = "/api/profile";
  const [user, setUser] = useState({});

  const navigate = useNavigate() ; 

  const fetchInfo = () => {
    const authToken = localStorage.getItem("authToken"); // Get authToken from localStorage

    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((response) => setUser(response.user))
      .catch((error) => {
        toast.error("Error fetching user data");
        console.error("Error fetching user data:", error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleTest = ( ) => {
    navigate('/test') ; 
  }

  // console.log(user);

  return (
    <>
      <div className="main-body">
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              User Profile
            </li>
          </ol>
        </nav>

        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="./assets/avatar_icon.png"
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-2">
                    <h4>{user.username}</h4>
                    <button className="btn btn-outline-primary mt-2" onClick={handleTest} >Take Test</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="my-2 text-2xl">Username</h6>
                  </div>
                  <div className="my-2 col-sm-9 text-secondary">{user.username}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="my-2 text-2xl">Email</h6>
                  </div>
                  <div className="my-2 col-sm-9 text-secondary">{user.email}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="my-2 text-2xl">Phone</h6>
                  </div>
                  <div className="my-2 col-sm-9 text-secondary">(+91) {user.phoneno}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="my-2 text-2xl">Age</h6>
                  </div>
                  <div className="my-2 col-sm-9 text-secondary">
                    {user.age}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="my-2 text-2xl">Bio</h6>
                  </div>
                  <div className="my-2 col-sm-9 text-secondary">
                    {user.bio? user.bio: "No bio provided"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
