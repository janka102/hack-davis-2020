const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const api = require("./api");

const app = express();
const { PORT } = process.env;

app.use(bodyParser.json({ limit: "500kb" }));
app.use(morgan("dev"));

app.use(
  express.static(
    path.join(__dirname, "..", "..", "front-end", "dist", "front-end")
  )
);
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", api);

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
