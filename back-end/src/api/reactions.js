const mongoose = require("mongoose");
const express = require("express");
const Reaction = require("../../models/reaction");

const router = express.Router();

router.get("/", (req, res) => {
  const search = {};

  if (req.query.user) {
    search.user = mongoose.Types.ObjectId(req.query.user);
  }

  if (req.query.lecture) {
    search.lecture = mongoose.Types.ObjectId(req.query.lecture);
  }

  Reaction.find(search)
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
  Reaction.findById(req.params.id)
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
