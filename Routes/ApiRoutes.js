const router = require("express").Router();
const { Router } = require("express");
const campgrounds = require("../controllers/campgrounds");
const user = require("../controllers/user");

router.post("/AddCampgrounds", campgrounds.AddCampgrounds);
router.get("/getCampGrounds", campgrounds.getCampGrounds);
router.post("/register", user.register);
router.post("/login", user.login);
router.post("/contact", user.sendmailforcontact);

module.exports = router;
