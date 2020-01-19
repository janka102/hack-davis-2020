const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const DEFAULT_PORT = 2020;
const { PORT } = process.env;
const port = PORT || DEFAULT_PORT;

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(
  express.static(
    path.join(__dirname, "..", "..", "front-end", "dist", "front-end")
  )
);

exports.run = () => {
  const server = app.listen(port, () => {
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
