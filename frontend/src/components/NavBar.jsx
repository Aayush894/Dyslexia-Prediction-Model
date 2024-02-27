import { Link, useNavigate } from "react-router-dom";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-success navbar-dark fixed-top">
        <div className="container-fluid">
  <Link className="navbar-brand" to="/profile">
    <img
      src="./assets/avatar_icon.png"
      alt="Avatar Logo"
      style={{width: 40, height: 40, borderRadius: '50%'}}
    />
  </Link>

          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link fw-bold text-white" to="/">
                Home
              </Link>
            </li>

            {localStorage.getItem("authToken") ? (
              <li className="nav-item">
                <Link className="nav-link fw-bold text-white" to="/testrecord">
                  {" "}
                  Records{" "}
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1" to="/signup">
                Signup
              </Link>
            </div>
          ) : (
            <div className="d-flex">
              <Link className="nav-link fw-bold text-white mx-1" to="/contact">
                <ContactSupportIcon fontSize="medium" />
              </Link>

              <div
                className="btn bg-white text-danger mx-1"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
