import React, { useEffect, useState } from "react";
import NavBar1 from "../../Components/Navbar/Navbar";
import Nav from "../../Components/NavBar1/Nav";
import "./Campground.css";
import Cards from "../../Assets/cards.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Slider from "@mui/material/Slider";
import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { BiDownArrow } from "react-icons/bi";
import Button from "@mui/material/Button";
import ImageModal from "../../Components/ImageModal";
import map from "../../Assets/map.png";

export default function Campgrounds() {
  const [data, setData] = useState();

  useEffect(() => {
    try {
      fetch("http://localhost:3211/getCampGrounds")
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp.data);
          setData(resp.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const userId = localStorage.getItem("userId");

  const addToWishlist = async (campId) => {
    try {
      const body = {
        userId: userId,
        campId: campId,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };

      const resp = await fetch(
        "http://localhost:3211/AddToWishlist",
        requestOptions
      );

      if (resp.status === 200) {
        alert("added to wishlist");
      } else if (resp.status === 300) {
        alert("already in wishlist");
      } else {
        alert("error");
      }
    } catch (error) {
      alert("error");
      console.log("error=>", error);
    }
  };

  return (
    <div>
      <Nav />

      {/* search bar!!!!!!!!!! */}

      <div className="searchbar">
        <div style={{ display: "flex" }}>
          <div
            style={{
              position: "relative",
              border: "2px solid black",
              height: "50px",
              background: "white",
              borderRadius: "10px",
              borderColor: "#022B3A",
              marginLeft: "-120px",
              marginRight: "79px",
              width: "250px",
            }}
          >
            <AiOutlineSearch
              size={20}
              style={{ left: "2%", top: "25%", position: "absolute" }}
            />
            <input
              type="text"
              className="searchInput"
              style={{
                position: "absolute",
                border: "none",
                outline: "none",
                height: "40px",
                marginBottom: "20px",
                fontSize: "20px",
                width: "150px",
                left: "20%",
                // marginLeft: "20px",
                // marginBottom: "100px",
                // backgroundColor:"#f5cac35c"
              }}
              placeholder="Search Place"
            />
          </div>
          <div>
            <p
              style={{
                marginBottom: "0px",
                textAlign: "left",
                marginLeft: "30px",
                marginTop: "0px",
                fontSize: "15px",
              }}
            >
              Prices <span style={{ marginLeft: "150px" }}> Rs.0 - 50,000</span>
            </p>

            <Slider
              style={{
                width: "280px",
                color: "#022B3A",
                marginLeft: "20px",
                // marginTop: "10px",
              }}
              defaultValue={50}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </div>

          <div className="dropdown">
            <button className="dropbtn">
              {" "}
              Rating{" "}
              <BiDownArrow
                style={{ marginLeft: "10px", marginTop: "5px" }}
              />{" "}
            </button>
            <div className="dropdown-content">
              <a href="#">⭐⭐⭐⭐⭐</a>
              <a href="#">⭐⭐⭐⭐</a>
              <a href="#">⭐⭐⭐</a>
              <a href="#">⭐⭐</a>
            </div>
          </div>

          <Button
            variant="contained"
            style={{
              height: "50px",
              width: "150px",
              backgroundColor: "#022B3A",
              borderRadius: "20px",
              marginLeft: "100px",
            }}
          >
            {" "}
            Search{" "}
          </Button>
        </div>
      </div>

      <br />
      <br />
      <br />
      <div style={{ display: "flex", marginTop: "-52px" }}>
        <div className="cardsMainDiv">
          <div>
            {data &&
              data.map((d) => (
                <div className="cards">
                  <ImageModal
                    image={`http://localhost:3211/uploads/${d.imageId}`}
                  />
                  <div>
                    <div style={{ display: "flex" }}>
                      <p className="campName"> {d.name} </p>
                      <AiOutlineHeart
                        onClick={() => addToWishlist(d._id)}
                        size={30}
                        style={{
                          marginTop: "10px",
                          left: "94%",
                          cursor: "pointer",

                          position: "absolute",
                        }}
                      />
                    </div>
                    <div style={{ position: "absolute", left: "34%" }}>
                      ⭐⭐⭐⭐⭐
                    </div>
                    <div
                      className="hoverWala"
                      style={{
                        display: "flex",
                        margin: "10px",
                        borderRadius: "20px",
                        marginBottom: "40px",
                        marginTop: "50px",
                      }}
                    >
                      <GoLocation
                        size={20}
                        style={{
                          marginTop: "4px",
                          marginLeft: "20px",
                          marginRight: "10px",
                        }}
                      />

                      <p> {d.location} </p>
                    </div>

                    <div style={{}}>
                      <p
                        style={{
                          marginTop: "5px",
                          position: "absolute",
                          left: "37%",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            padding: "5px",
                            borderRadius: "10px",
                          }}
                        >
                          8.3
                        </span>{" "}
                        <span style={{ fontWeight: "550" }}>{d.review}</span>{" "}
                        (1007 reviews){" "}
                      </p>
                    </div>
                  </div>
                  <div className="priceTag">
                    <p
                      style={{
                        fontSize: "20px",
                        marginTop: "5px",
                        marginBottom: "5px",
                        fontWeight: "550",
                      }}
                    >
                      Pricing
                    </p>
                    <p style={{ marginTop: "1px" }}>
                      {" "}
                      <span
                        style={{
                          color: "green",
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        ✅ Free Cancellation
                      </span>{" "}
                    </p>

                    <p style={{ fontSize: "15px" }}>
                      <span
                        style={{
                          fontSize: "20px",
                          color: "green",
                          fontWeight: "600",
                        }}
                      >
                        Rs. {d.price}{" "}
                      </span>{" "}
                      per day
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div>
          <img className="map" src={map} alt="" />
        </div>
      </div>
    </div>
  );
}
