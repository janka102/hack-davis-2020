const express = require("express");
const fs = require("fs");
const vision = require("@google-cloud/vision");
const mongoose = require("mongoose");
const path = require("path");
const Reaction = require("../../models/reaction");
const User = require("../../models/user");

const router = express.Router();
const visionClient = new vision.ImageAnnotatorClient();
const reactionFolder = path.join(__dirname, "..", "..", "public", "reactions");

router.get("/", (req, res) => {
  User.find({})
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
  User.findById(req.params.id)
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

// Things to consider:
// - What student is this?
// - What lecture is this for?
// - What time in the lecture was this picture taken?
router.post("/faceDetect", (req, res) => {
  let { camera: picture, user, lecture, time } = req.body;

  if (!user || !lecture || typeof time !== "number") {
    res.status(400);
    return res.json({
      error:
        "Must provide `user` ID, `lecture` ID, and `time` reaction happened"
    });
  }

  if (picture.indexOf("data:") === 0) {
    picture = picture.slice(picture.indexOf("base64,") + "base64,".length);
  }

  const content = Buffer.from(picture, "base64");

  visionClient
    .faceDetection({ image: { content } })
    .then(([response]) => {
      const faces = response.faceAnnotations;
      if (faces.length < 1) {
        return Reaction.create({
          user: mongoose.Types.ObjectId(user),
          lecture: mongoose.Types.ObjectId(lecture),
          time,
          source: "video",
          result: null
        }).then(reaction => {
          res.json(reaction);
        });
      }

      const {
        rollAngle,
        panAngle,
        tiltAngle,
        detectionConfidence,
        joyLikelihood,
        sorrowLikelihood,
        angerLikelihood,
        surpriseLikelihood
      } = faces[0];

      const face = {
        roll: rollAngle,
        pan: panAngle,
        tilt: tiltAngle,
        detectionConfidence,
        joy: likelihoodToNumber(joyLikelihood),
        sorrow: likelihoodToNumber(sorrowLikelihood),
        anger: likelihoodToNumber(angerLikelihood),
        surprise: likelihoodToNumber(surpriseLikelihood)
      };

      // const filename = `${Date.now()}-${(10 + Math.random() * 90) | 0}`;
      // fs.writeFile(
      //   path.join(reactionFolder, filename + ".png"),
      //   content,
      //   err => {}
      // );
      // fs.writeFile(
      //   path.join(reactionFolder, filename + ".json"),
      //   JSON.stringify(face, null, 2),
      //   err => {}
      // );

      return Reaction.create({
        user: mongoose.Types.ObjectId(user),
        lecture: mongoose.Types.ObjectId(lecture),
        time,
        source: "video",
        result: face
      }).then(reaction => {
        res.json(reaction);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.json({
        error: err
      });
    });
});

/**
 * Convert a likelihood string to a number between 0-1
 *
 * @param {string} likelihood
 * @returns number
 */
function likelihoodToNumber(likelihood) {
  switch (likelihood) {
    case "VERY_UNLIKELY":
      return Math.random() * 0.2;
    case "UNLIKELY":
      return 0.2 + Math.random() * 0.2;
    case "POSSIBLE":
      return 0.4 + Math.random() * 0.2;
    case "LIKELY":
      return 0.6 + Math.random() * 0.2;
    case "VERY_LIKELY":
      return 0.8 + Math.random() * 0.2;
    default:
      return 0;
  }
}

module.exports = router;
