// import React from "react";
import Nav from "../../Components/NavBar1/Nav";
import "./Profile.css";
import profileImg from "../../Assets/profile.jpg";
import ImageModal from "../../Components/ImageModal";
import { MdOutlineDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import React, { useState, useEffect } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import EditModal from "../../Components/EditModal";
import DeletePopUp from "../../Components/DeletePopUp";

export default function Profile() {
  const navigate = useNavigate();

  const [data, setData] = useState();

  const id = localStorage.getItem("userId");
  const contact = localStorage.getItem("contact");
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    try {
      fetch(`http://localhost:3211/getMyCampGrounds/${id}`)
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp.data);
          console.log("id=>", id);
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
        <div className="signout-btn" onClick={() => logout()}>
          <p className="signout-text">
            Sign Out <AiOutlineLogin size={18} />{" "}
          </p>
        </div>
        <div className="profile-div1">
          <img className="profile-img" src={profileImg} alt="" />
          <div style={{ marginLeft: "40px", marginTop: "20px" }}>
            <p className="my-name"> {name}</p>
            <p
              style={{
                // textAlign: "left",
                marginTop: "10px",
                marginBottom: "5px",
              }}
            ></p>

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
                2 Camp grounds Added
              </p>
            </div>
          </div>
          <div style={{ marginLeft: "130px", marginTop: "30px" }}>
            <p>Email : {email}</p>
            <p>Contact No. : {contact}</p>
          </div>
        </div>
        <p style={{ fontSize: "25px", fontWeight: "500", marginTop: "100px" }}>
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
                      <EditModal data={d} />

                      <DeletePopUp id={d._id} />
                    </div>
                    <div style={{ marginLeft: "5px", position: "absolute" }}>
                      ⭐⭐⭐⭐⭐
                    </div>
                    <div
                      className="hoverWala"
                      style={{
                        display: "flex",
                        margin: "10px",
                        borderRadius: "20px",
                        marginTop: "20px",
                      }}
                    >
                      <GoLocation
                        size={20}
                        style={{
                          marginTop: "8px",
                          marginLeft: "5px",
                          marginRight: "10px",
                        }}
                      />

                      <p> {d.location} </p>
                    </div>

                    <div style={{ marginTop: "30px" }}>
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
