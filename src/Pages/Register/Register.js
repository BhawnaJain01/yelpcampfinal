import React, { useState } from "react";
import "./Register.css";
import Nav from "../../Components/NavBar1/Nav";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import registerImg from "../../Assets/registerImg.jpeg";

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [phone, setPhone] = useState();

  const body = {
    Name: name,
    Email: email,
    contactNo: parseInt(phone),
    password: password,
  };

  const registerSubmit = async () => {
    console.log("body=> ", body);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const resp = await fetch(
        "http://localhost:3211/register",
        requestOptions
      );
      if (resp.status === 200) {
        alert("Successfully Registered");
      } else {
        alert("error");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Nav />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="register-main-div">
          <div className="register-div">
            <p className="register-head">Get Registered</p>

            <TextField
              style={{ margin: "10px" }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              style={{ margin: "10px" }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              style={{ margin: "10px" }}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="paasword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              style={{ margin: "10px" }}
              id="outlined-basic"
              label="ContactNumber"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <br />

            <Button
              onClick={() => registerSubmit()}
              sx={{ marginTop: "30px" }}
              variant="contained"
            >
              Register
            </Button>
          </div>
          <div>
            <img className="register-img" src={registerImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
