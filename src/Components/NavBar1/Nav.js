import React from "react";
// import MainPage from ""
// import homepage from "../../Assets/homepage.jpg"
import "./Nav.css";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { RiSunFoggyLine } from "react-icons/ri";
import { RiContactsFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import yelplogo from "../../Assets/yelplogo.png";
import Tooltip from "@mui/material/Tooltip";

export default function Nav() {
  const auth = localStorage.getItem("Auth");

  return (
    <div className="NavBar1">
      {/* <p className="yelpcamp1">Yelpcamp</p> */}
      <img style={{ marginLeft: "20px" }} src={yelplogo} alt="" />
      <div className="leftSubDiv1">
        {/* <div style={{display : "flex"}}> */}

        <AiOutlineHome size={25} className="homeicon" />
        <Link to="/" className="linkC">
          <p className="navContent1">Home</p>{" "}
        </Link>

        {/* </div> */}
        <RiSunFoggyLine size={25} className="homeicon" />
        <Link className="linkC" to="/Campgrounds">
          <p className="navContent1">Campgrounds</p>
        </Link>

        <RiContactsFill size={25} className="homeicon" />
        <Link className="linkC" to="/Contact">
          <p className="navContent1">Contact</p>
        </Link>
        {auth ? (
          <>
            <AiOutlineHeart size={25} className="homeicon" />
            <Link className="linkC" to="/wishlist">
              <p className="navContent1">Wishlist</p>
            </Link>
            <Tooltip title="Profile">
              <Link to="/profile">
                <Avatar
                  src="/broken-image.jpg"
                  className="avatar"
                  sx={{ bgcolor: red[100], cursor: "pointer" }}
                />
              </Link>
            </Tooltip>
          </>
        ) : (
          <>
            <Link to="/register">
              <button className="btns signup-btn">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="btns login-btn">Login</button>
            </Link>
          </>
        )}
        {/* <AiOutlineHeart size={25} className="homeicon" />
        <p className="navContent1">Wishlist</p>
        <Link to="/profile">
          <Avatar
            src="/broken-image.jpg"
            sx={{ bgcolor: red[100] }}
            className="avatar"
          />
        </Link> */}
      </div>
    </div>
  );
}
