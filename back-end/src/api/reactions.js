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

router.post("/", (req, res) => {
  let { user, lecture, time, source, result } = req.body;

  if (!user || !lecture || typeof time !== "number") {
    res.status(400);
    return res.json({
      error:
        "Must provide `user` ID, `lecture` ID, and `time` reaction happened"
    });
  }

  Reaction.create({
    user: mongoose.Types.ObjectId(user),
    lecture: mongoose.Types.ObjectId(mongoose),
    time,
    source: "button",
    result
  })
    .then(reaction => {
      res.json(reaction);
    })
    .catch(err => {
      res.status(500);
      res.json({
        error: err
      });
    });
});

module.exports = router;
