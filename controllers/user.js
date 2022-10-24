const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const path = require("path");
const campgrounds = require("../models/campgrounds");
const users = require("../models/Users");
const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { ObjectID } = require("bson");
const multer = require("multer");

module.exports = {
  register,
  login,
  sendmailforcontact,
};

async function register(req, res, next) {
  try {
    const user = await users.findOne({ email: req.body.Email });
    if (user) {
      console.log(" Already registered ");
      return res.status(300).json({ message: "already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const Secpassword = await bcrypt.hash(req.body.password, salt);

    const data = await users.create({
      email: req.body.Email,
      name: req.body.Name,
      password: Secpassword,
      contactNo: req.body.contactNo,
    });
    console.log("data entered :", data);
    res.status(200).json("register done");
    return next();
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

async function login(req, res, next) {
  const { Email, Password } = req.body;
  console.log("user email", Email);
  console.log("user password", Password);
  if (!Email || !Password)
    return res
      .status(400)
      .json({ message: "Please provide email and password " });
  console.log("still on");

  try {
    const data = await users.find({ email: Email });

    if (!data) {
      console.log("No user exist with this email.");
      return res.status(401).json({ message: "No user exist with this email" });
    }

    console.log("data=> ", data);
    // console.log("data->",data);
    const pass = await users.findOne({ email: Email });
    // console.log("pass->",pass);
    // console.log("password->",pass.password);
    console.log("pass=>", pass);
    if (!bcrypt.compareSync(Password, pass.password)) {
      return res.status(402).json({ message: "Password Incorrect" });
    } else {
      // const data = await Users.findAll({ where: { email: req.body.Email } });
      console.log("Login Successfully done now");
      return res.status(200).json({ pass });
    }

    // return next();
  } catch (err) {
    console.log("Error in getUsers : ", err);
    return res.status(400).json(err);
  }
}

async function sendmailforcontact(req, res, next) {
  // const val = Math.floor(1000 + Math.random() * 9000);

  try {
    const tranporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "contact.technomaits@gmail.com",
        pass: "qhtpgbivqupkszzf",
      },
    });

    const mailOptions = {
      from: req.body.Email,
      to: "contact.technomaits@gmail.com",
      subject: `${req.body.name} wants to contact from ${req.body.Email} and contact number is ${req.body.phone}`,
      text: req.body.message,
    };
    // console.log(text);

    tranporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send("error");
      } else {
        console.log("send");
        res.send("success");
      }
    });

    // console.log("data entered : ", data);

    return res.status(200).json("mail sent succesfully");
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}
