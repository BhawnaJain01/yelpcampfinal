const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const path = require("path");

const campgrounds = require("../models/campgrounds");
const wishlist = require("../models/Wishlist");
// const { User } = require("../models");
const express = require("express");
// const nodemailer = require("nodemailer");

const bcrypt = require("bcrypt");
const { ObjectID } = require("bson");
const multer = require("multer");

const { baseAggregate } = require("./Repositories/baseRepository");

module.exports = {
  AddCampgrounds,
  getCampGrounds,
  editCampGrounds,
  deleteCampGrounds,
  getMyCampGrounds,

  //wishlist
  AddToWishlist,
  getWishlist,
  deleteFromWishlist,
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
    }).single("image");

    upload(req, res, async function (err) {
      if (err) {
        return res.send(err);
      } else {
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

async function editCampGrounds(req, res) {
  try {
    console.log("body=>", req.body);
    const name = req.body.name;
    const location = req.body.location;
    const price = req.body.price;
    const id = req.body.id;

    const data = await campgrounds.updateOne(
      { _id: id },
      { name: name, location: location, price: price }
    );

    return res.status(200).json({ messgae: "success" });
  } catch (error) {
    console.log("error=>", error);
    return res.status(400).json({ messgae: "failed" });
  }
}

async function deleteCampGrounds(req, res) {
  try {
    const data = await campgrounds.deleteOne({ _id: req.params.id });

    return res.status(200).json({ messgae: "success" });
  } catch (error) {
    console.log("error=>", error);
    return res.status(400).json({ messgae: "failed" });
  }
}

async function AddToWishlist(req, res) {
  try {
    const camp = await wishlist.findOne({
      userId: req.body.userId,
      campId: req.body.campId,
    });

    if (camp) {
      return res.status(300).json({ message: "already in wishlist" });
    } else {
      const data = await wishlist.create(req.body);

      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    return res.status(400).json({ message: "failed" });
  }
}

async function getWishlist(req, res) {
  const params = new mongoose.Types.ObjectId(req.params.userId);
  console.log("hi");

  if (!params)
    return res.status(400).json({ message: "userId is required in params" });

  console.log("world");
  console.log(params);

  try {
    let query = [
      {
        $match: {
          userId: params,
        },
      },

      {
        $lookup: {
          from: "campgrounds",
          localField: "campId",
          foreignField: "_id",
          as: "camp",
        },
      },

      {
        $unwind: { path: "$camp", preserveNullAndEmptyArrays: false },
      },

      {
        $project: {
          _id: 1,
          campId: "$camp._id",
          imgId: "$camp.imageId",
          name: "$camp.name",
          price: "$camp.price",
          location: "$camp.location",
        },
      },
    ];

    let data = await baseAggregate(wishlist, query);
    console.log("data=>", data);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ mesage: "no data found" });
  }
}

async function deleteFromWishlist(req, res) {
  try {
    const data = await wishlist.deleteOne({ _id: req.params.id });
    return res.status(200).json({ message: "deleted" });
  } catch (error) {
    return res.status(400).json({ message: "failed" });
  }
}

async function getMyCampGrounds(req, res) {
  try {
    const data = await campgrounds.find({ userId: req.params.id });

    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(400).json({ data: "not found" });
  }
}
