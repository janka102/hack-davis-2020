const express = require("express");
const courses = require("./courses");
const lectures = require("./lectures");
const reactions = require("./reactions");
const users = require("./users");

const router = express.Router();

router.use("/courses", courses);
router.use("/lectures", lectures);
router.use("/reactions", reactions);
router.use("/users", users);

module.exports = router;
