const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://hackDavisArc:<password>@cluster0-lvxvt.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

let connected = false;

module.exports.connect = () => {
  return new Promise((resolve, reject) => {
    if (connected) {
      return resolve(client);
    }

    client.connect(err => {
      if (err) {
        return reject(err);
      }

      connected = true;
      module.exports.client = client;

      process.on("exit", () => {
        client.close();
      });

      resolve(client);
    });
  });
};
