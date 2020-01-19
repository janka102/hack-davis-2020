const express = require("express");
const Lecture = require("../../models/lecture");

const router = express.Router();

router.get("/", (req, res) => {
  Lecture.find({})
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500);
      res.json({
        error: err
      });
    });
});

router.get("/:id", (req, res) => {
  Lecture.findById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500);
      res.json({
        error: err
      });
    });
});
module.exports = router;
