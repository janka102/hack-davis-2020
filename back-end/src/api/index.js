const express = require("express");
const student = require("./student");

const router = express.Router();

router.use("/student", student);

module.exports = router;
