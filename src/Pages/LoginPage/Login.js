import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import Nav from "../../Components/NavBar1/Nav";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const body = {
    Email: email,
    Password: password,
  };

  const loginSubmit = async () => {
    console.log("body=> ", body);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const resp = await fetch("http://localhost:3211/login", requestOptions);
      // resp.json().then((data) => {

      resp.json().then((data) => {
        if (resp.status === 200) {
          // alert("Login Successful");
          localStorage.setItem("Auth", true);
          console.log("resp=>", data.pass);
          localStorage.setItem("userId", data.pass._id);
          localStorage.setItem("contact", data.pass.contactNo);
          localStorage.setItem("email", data.pass.email);
          localStorage.setItem("name", data.pass.name);
          navigate("/");
        } else {
          alert("error");
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Nav />
      <div className="login-main-div">
        <div className="login-div">
          <p className="login-head">Login</p>
          <hr
            style={{
              width: "150px",
              height: "7px",
              backgroundColor: "#FFCDD2",
              border: "none",
              margin: "auto",
            }}
          />

          <TextField
            style={{ marginTop: "60px", marginBottom: "20px" }}
            className="inputs-login"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="input2-login"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="forgot-pass">Forgot Password</p>

          <p className="not-register">Not registered yet .. ? Register Here</p>

          <Button
            style={{ marginTop: "20px" }}
            onClick={() => loginSubmit()}
            variant="contained"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
