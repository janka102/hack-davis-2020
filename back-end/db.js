const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connect = new Promise((resolve, reject) => {
  const db = mongoose.connection;

  db.on("error", reject);
  db.once("open", () => {
    loadModels();
    resolve(mongoose);
  });
});

function loadModels() {
  const models = fs.readdirSync(path.join(__dirname, "models"));

  for (const model of models) {
    require("./models/" + model);
  }
}

module.exports.connect = connect;
