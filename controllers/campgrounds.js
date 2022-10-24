const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const path = require("path");

const campgrounds = require("../models/campgrounds");
// const { User } = require("../models");
const express = require("express");
// const nodemailer = require("nodemailer");

const bcrypt = require("bcrypt");
const { ObjectID } = require("bson");
const multer = require("multer");

module.exports = {
  AddCampgrounds,
  getCampGrounds,
};

async function AddCampgrounds(req, res, next) {
  try {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "ImgUploads");
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      },
    });

    const maxSize = 200 * 1024;

    var upload = multer({
      storage: storage,
      limits: { fileSize: maxSize },
      fileFilter: function (req, file, cb) {
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(
          path.extname(file.originalname).toLowerCase()
        );

        if (mimetype && extname) {
          return cb(null, true);
        }

        cb(
          "Error: File upload only supports the " +
            "following filetypes - " +
            filetypes
        );
      },

      // mypic is the name of file attribute
    }).single("image");

    upload(req, res, async function (err) {
      if (err) {
        // ERROR occurred (here it can be occurred due
        // to uploading image of size greater than
        // 1MB or uploading different file type)
        return res.send(err);
      } else {
        // productsData.update({ imageId: req.file.filename }, { where: { id: 2 } });
        const data = await campgrounds.create({
          imageId: req.file.filename,
          userId: req.body.userId,
          name: req.body.name,
          location: req.body.location,
          price: req.body.price,
          review: req.body.review,
        });

        console.log("data uploaded :", data);
        return res.status(200).json("camp ground Added successfully");
        // SUCCESS, image successfully uploaded
        // res.send("Success, Image uploaded!");
      }
    });
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

async function getCampGrounds(req, res, next) {
  try {
    const data = await campgrounds.find();

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json(error);
  }
}
