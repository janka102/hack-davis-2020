const path = require("path");

const DEFAULT_PORT = 2020;
const DEFAULT_CREDENTIALS = path.join(__dirname, "gcp-service.json");

if (!process.env.PORT) {
  process.env.PORT = DEFAULT_PORT;
}

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = DEFAULT_CREDENTIALS;
}

const app = require("./src/app");

app.run();
