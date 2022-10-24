import React from "react";
import NavBar from "../../Components/Navbar/Navbar";
import homepage from "../../Assets/homepage.jpg";
// import * as React from 'react';
  import Button from "@mui/material/Button";
import "./HomePage.css";
import { Link } from "react-router-dom";
import Nav from "../../Components/NavBar1/Nav";

export default function HomePage() {
  return (
    <div>
      <img
        style={{ height: "745px", width: "1530px" }}
        className="bg-image"
        src={homepage}
        alt=""
      />
      <h1 className="header">YelpCamp</h1>
      <p className="sub-content">Welcome to Yelpcamp!!</p>
      <p className="sub-content1">
        Jump right in and explore our many campgrounds
      {/* </p>
      <p className="sub-content2"> */}
      <br />
        Feel free to share some of yours and comment others!
      </p>
      {/* <div style={{ position: "absolute", top: 430, left: 670 }}> */}
        <div className="yelp">
        <Link to="AddCampgrounds">
          <Button
            variant="contained"
            style={{
              backgroundColor: "rgb(245 202 195 / 72%)",
              color: "black",
              padding: "10px 20px",
            }}
          >
            {" "}
            Add
             Campgrounds
          </Button>
        </Link>
      </div>
      <NavBar/>
    </div>
  );
}
