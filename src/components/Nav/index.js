import React from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function Nav() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate(`/signin`);
  };
  return (
    <div className="navbar">
      <h1 className="nav_logo">Addis Cinema</h1>
      {/* <img className="nav_logo" src={addis} alt="logo" /> */}
      <nav className="nav_link">
        <Link to="/movies/:id">Home</Link>
        <Link to="/tvshows">Tv Shows</Link>
        <Link to="/mylist">My list</Link>
      </nav>
      <div className="nav_avatar">
        <FiLogOut
          onClick={handleSignOut}
          style={{
            color: "#fff",
            width: "20px",
            height: "60px",
            backgroundColor: "#111",
            borderRadius: "50%",
            marginRight: "30px",
          }}
        />
        {/* Todo: do user authentication*/}
        {/* <img
          className="nav_avatar"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
          alt="cartoon avatar"
        /> */}
      </div>
    </div>
  );
}
