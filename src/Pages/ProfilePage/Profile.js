// import React from "react";
import Nav from "../../Components/NavBar1/Nav";
import "./Profile.css";
import profileImg from "../../Assets/profile.jpg";
import ImageModal from "../../Components/ImageModal";
import { MdOutlineDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import React, { useState, useEffect } from "react";

export default function Profile() {
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
  return (
    <>
      <Nav />
      <div className="main-profile">
        {" "}
        <p className="profile-head">Profile</p>{" "}
        <div className="profile-div1">
          <img className="profile-img" src={profileImg} alt="" />
          <div style={{ marginLeft: "40px", marginTop: "20px" }}>
            <p className="my-name">Sahil Rohera</p>
            <p
              style={{
                // textAlign: "left",
                marginTop: "10px",
                marginBottom: "5px",
              }}
            >
              Abc address
            </p>

            <div
              style={{
                width: "auto",
                padding: "8px",
                backgroundColor: "#F5CAC3",
                borderRadius: "20px ",
                marginTop: "20px",
              }}
            >
              <p
                style={{
                  textAlign: "left",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                1 Camp grounds Added
              </p>
            </div>
          </div>
          <div style={{ marginLeft: "130px", marginTop: "30px" }}>
            <p>Email : sahilrohera10@gmail.com</p>
            <p>Contact No. : 7428727172</p>
          </div>
        </div>
        <p style={{ fontSize: "25px", fontWeight: "500" }}>
          Added Camp Grounds
        </p>
        <div className="cardsMainDiv1">
          <div style={{ marginTop: "50px" }}>
            {data &&
              data.map((d) => (
                <div className="cards1">
                  <ImageModal
                    image={`http://localhost:3211/uploads/${d.imageId}`}
                  />
                  <div>
                    <div style={{ display: "flex" }}>
                      <p className="campName1"> {d.name} </p>
                      <MdModeEditOutline
                        size={30}
                        style={{
                          marginTop: "10px",
                          left: "85%",

                          position: "absolute",
                        }}
                      />
                      <MdOutlineDeleteOutline
                        size={30}
                        style={{
                          marginTop: "10px",
                          left: "94%",

                          position: "absolute",
                        }}
                      />
                    </div>
                    <div style={{ marginLeft: "-100px", marginTop: "-15px" }}>
                      ⭐⭐⭐⭐⭐
                    </div>
                    <div
                      className="hoverWala"
                      style={{
                        display: "flex",
                        margin: "10px",
                        borderRadius: "20px",
                      }}
                    >
                      <GoLocation
                        size={20}
                        style={{
                          marginTop: "18px",
                          marginLeft: "5px",
                          marginRight: "10px",
                        }}
                      />

                      <p> {d.location} </p>
                    </div>

                    <div style={{}}>
                      <p style={{ marginTop: "5px" }}>
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
                  <div className="priceTag1">
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
      </div>
    </>
  );
}
