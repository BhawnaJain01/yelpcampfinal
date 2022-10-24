import React, { useState } from "react";
import axios from "axios";

import "./AddCampGroundPage.css";
import { FileUploader } from "react-drag-drop-files";
import Nav from "../../Components/NavBar1/Nav";

const fileTypes = ["JPG", "PNG", "JPEG"];

export default function AddCampGroundPage() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [location, setLocation] = useState();
  const [review, setReview] = useState();
  const handleChange = (file) => {
    setFile(file);
  };

  const id = localStorage.getItem("userId");

  const handleAdd = async () => {
    const formData = new FormData();

    formData.append("image", file);
    formData.append("name", name);
    formData.append("price", parseInt(price));
    formData.append("location", location);
    formData.append("review", review);
    formData.append("userId", id);

    const resp = await axios.post(
      "http://localhost:3211/AddCampgrounds",
      formData
    );
    console.log("resp=>", resp);
    if (resp.status === 200) {
      // window.location.reload();
      alert("product uploaded");
    } else {
      alert("error");
    }
  };

  return (
    <>
      <Nav />
      <div className="addMainDiv">
        <p style={{ fontSize: "30px", fontWeight: "600" }}>Add Camp Ground</p>
        <div className="formDiv">
          <div>
            <div className="inputDiv">
              <p className="titleName">Name</p>
              <input
                className="inputBox"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </div>

            <div className="inputDiv">
              <p className="titleName">Price/day</p>
              <input
                className="inputBox"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="text"
              />
            </div>

            <div className="inputDiv">
              <p className="titleName">Location</p>
              <input
                className="inputBox"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                type="text"
              />
            </div>
            <div className="inputDiv">
              <p className="titleName">Review</p>
              <input
                className="inputBox"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                type="text"
              />
            </div>

            <FileUploader
              style={{ marginTop: "10px" }}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />

            <button onClick={() => handleAdd()} className="addBtn">
              Add New CampGround
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
