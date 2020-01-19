const mongoose = require("mongoose");
const express = require("express");
const Reaction = require("../../models/reaction");

const router = express.Router();

router.get("/", (req, res) => {
  const { lecture, time } = req.query;

  Reaction.find({
    lecture: mongoose.Types.ObjectId(lecture),
    time: {
      $lte: Number(time)
    }
  })
    .then(reactions => {
      let average = {};
      reactions
        .filter(r => r.source === "video")
        .forEach(r => {
          average[r.time] = average[r.time] || [];
          average[r.time].push(r.result);
        });

      for (let [time, result] of Object.entries(average)) {
        average[time] = result.reduce(
          (res, r) => ({
            time: Number(time),
            anger: res.anger + (r ? r.anger : 0) / result.length,
            sorrow: res.sorrow + (r ? r.sorrow : 0) / result.length,
            joy: res.joy + (r ? r.joy : 0) / result.length,
            surprise: res.surprise + (r ? r.surprise : 0) / result.length
          }),
          { anger: 0, sorrow: 0, joy: 0, surprise: 0 }
        );
      }

      reactions = Object.entries(average)
        .sort((a, b) => +a[0] - +b[0])
        .map(r => r[1]);

      res.json(reactions);
    })
    .catch(err => {
      console.log(err);
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
  let { user, lecture, time, result } = req.body;

  if (!user || !lecture || typeof time !== "number") {
    res.status(400);
    return res.json({
      error:
        "Must provide `user` ID, `lecture` ID, and `time` reaction happened"
    });
  }

  Reaction.create({
    user: mongoose.Types.ObjectId(user),
    lecture: mongoose.Types.ObjectId(lecture),
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
