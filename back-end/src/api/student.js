const express = require("express");
const vision = require("@google-cloud/vision");

const router = express.Router();
const visionClient = new vision.ImageAnnotatorClient();

// Things to consider:
// - What student is this?
// - What lecture is this for?
// - What time in the lecture was this picture taken?
router.post("/faceDetect", (req, res) => {
  let picture = req.body.camera;

  if (picture.indexOf("data:") === 0) {
    picture = picture.slice(picture.indexOf("base64,") + "base64,".length);
  }

  visionClient
    .faceDetection({
      image: {
        content: Buffer.from(picture, "base64")
      }
    })
    .then(([response]) => {
      const faces = response.faceAnnotations;
      console.log(faces);
      res.json(faces);
    })
    .catch(err => {
      res.status(500);
      res.json(err);
    });
});

module.exports = router;
