const express = require("express");
const vision = require("@google-cloud/vision");

const router = express.Router();
const visionClient = new vision.ImageAnnotatorClient();

router.post("/faceDetect", (req, res) => {
  visionClient
    .faceDetection({
      image: {
        content: Buffer.from(req.body.camera, "base64")
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
