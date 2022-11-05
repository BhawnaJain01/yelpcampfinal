const router = require("express").Router();
const { Router } = require("express");
const campgrounds = require("../controllers/campgrounds");
const user = require("../controllers/user");

//Campgrounds
router.post("/AddCampgrounds", campgrounds.AddCampgrounds);
router.get("/getCampGrounds", campgrounds.getCampGrounds);
router.put("/editCampGrounds", campgrounds.editCampGrounds);
router.delete("/deleteCampGrounds/:id", campgrounds.deleteCampGrounds);
router.get("/getMyCampGrounds/:id", campgrounds.getMyCampGrounds);

//Wishlist
router.post("/AddToWishlist", campgrounds.AddToWishlist);
router.get("/getWishlist/:userId", campgrounds.getWishlist);
router.delete("/deleteFromWishlist/:id", campgrounds.deleteFromWishlist);

//Users
router.post("/register", user.register);
router.post("/login", user.login);
router.post("/contact", user.sendmailforcontact);

module.exports = router;
