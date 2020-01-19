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
      // let times = new Set();

      // reactions = reactions
      //   .filter(r => {
      //     if (times.has(r.time)) {
      //       return false;
      //     }

      //     times.add(r.time);
      //     return true;
      //   })
      //   .map(r => ({
      //     time: Number(r.time),
      //     anger: (r.result || {}).anger || 0,
      //     sorrow: (r.result || {}).sorrow || 0,
      //     joy: (r.result || {}).joy || 0,
      //     surprise: (r.result || {}).surprise || 0
      //   }));

      // let average = {};
      // reactions
      //   .filter(r => r.source === "video")
      //   .forEach(r => {
      //     average[r.time] = average[r.time] || [];
      //     average[r.time].push(r.result);
      //   });

      // for (let [time, result] of Object.entries(average)) {
      //   average[time] = result.reduce(
      //     (res, r) => ({
      //       time: Number(time),
      //       anger: res.anger + (r ? r.anger : 0) / result.length,
      //       sorrow: res.sorrow + (r ? r.sorrow : 0) / result.length,
      //       joy: res.joy + (r ? r.joy : 0) / result.length,
      //       surprise: res.surprise + (r ? r.surprise : 0) / result.length
      //     }),
      //     { anger: 0, sorrow: 0, joy: 0, surprise: 0 }
      //   );
      // }

      // reactions = Object.entries(average)
      //   .sort((a, b) => +a[0] - +b[0])
      //   .map(r => r[1]);

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
            anger: res.anger + (r ? r.anger : 0),
            sorrow: res.sorrow + (r ? r.sorrow : 0),
            joy: res.joy + (r ? r.joy : 0),
            surprise: res.surprise + (r ? r.surprise : 0),
            tilt:
              Math.abs(res.tilt) < Math.abs(r ? r.tilt : 0) ? r.tilt : res.tilt,
            pan: Math.abs(res.pan) < Math.abs(r ? r.pan : 0) ? r.pan : res.pan,
            roll:
              Math.abs(res.roll) < Math.abs(r ? r.roll : 0) ? r.roll : res.roll
          }),
          { anger: 0, sorrow: 0, joy: 0, surprise: 0, tilt: 0, pan: 0, roll: 0 }
        );
        average[time].anger = average[time].anger / result.length;
        average[time].sorrow = average[time].sorrow / result.length;
        average[time].joy = average[time].joy / result.length;
        average[time].surprise = average[time].surprise / result.length;
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
