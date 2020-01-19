const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();
const { PORT } = process.env;

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(
  express.static(
    path.join(__dirname, "..", "..", "front-end", "dist", "front-end")
  )
);

exports.run = () => {
  const server = app.listen(PORT, () => {
    let addressInfo = server.address();
    let address;

    if (addressInfo === null) {
      addressInfo = "<unknown>";
    }

    if (typeof addressInfo === "string") {
      address = addressInfo;
    } else {
      address = `localhost:${addressInfo.port}`;
    }

    console.log(`=> Server listening at http://${address}`);
  });
};
