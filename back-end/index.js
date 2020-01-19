require("dotenv-defaults").config();
const path = require("path");
const db = require("./db");

const DEFAULT_CREDENTIALS = path.join(__dirname, "gcp-service.json");

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = DEFAULT_CREDENTIALS;
}

const app = require("./src/app");

db.connect.then(() => {
  console.log("=> Connected to MongoDB");
  app.run();
});
