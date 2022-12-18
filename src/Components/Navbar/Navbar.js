import React from "react";
import Tooltip from "@mui/material/Tooltip";

import homepage from "../../Assets/homepage.jpg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { RiSunFoggyLine } from "react-icons/ri";
import { RiContactsFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import yelplogo from "../../Assets/yelplogo.png";
export default function NavBar() {
  const auth = localStorage.getItem("Auth");
  return (
    <div className="NavBar">
      <img style={{ marginLeft: "20px" }} src={yelplogo} alt="" />
      <div className="leftSubDiv">
        <AiOutlineHome size={25} className="homeicon" />
        <Link to="/" className="linkC">
          <p className="navContent">Home</p>{" "}
        </Link>

        <RiSunFoggyLine size={25} className="homeicon" />
        <Link className="linkC" to="/Campgrounds">
          <p className="navContent">Campgrounds</p>
        </Link>

        <RiContactsFill size={25} className="homeicon" />
        <Link className="linkC" to="/Contact">
          <p className="navContent">Contact</p>
        </Link>

        {auth ? (
          <>
            <AiOutlineHeart size={25} className="homeicon" />
            <Link className="linkC" to="/wishlist">
              <p className="navContent">Wishlist</p>
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
      </div>
    </div>
  );
}
