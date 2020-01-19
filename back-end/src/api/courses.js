const express = require("express");
const Course = require("../../models/course");

const router = express.Router();

router.get("/", (req, res) => {
  Course.find({})
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
  Course.findById(req.params.id)
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
