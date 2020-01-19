const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
const models = {};

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connect = new Promise((resolve, reject) => {
  const db = mongoose.connection;

  db.on("error", reject);
  db.once("open", () => {
    loadModels();
    seedModels();
    resolve(mongoose);
  });
});

function loadModels() {
  const modelFiles = fs.readdirSync(path.join(__dirname, "models"));

  for (const model of modelFiles) {
    const modelName = path.basename(model, ".js");
    models[modelName] = require("./models/" + model);
  }
}

function seedModels() {
  const seeds = fs.readdirSync(path.join(__dirname, "seed"));

  Promise.all(
    seeds.map(seedFile => {
      const modelName = path.basename(seedFile, ".json");
      const model = models[modelName];

      const seed = require("./seed/" + seedFile).map(item => {
        for (const [key, value] of Object.entries(item)) {
          if (key === "_id") {
            item[key] === mongoose.Types.ObjectId(value);
          } else if (typeof value === "object") {
            item[key] === mongoose.Types.ObjectId(item[key]._id);
          }
        }
        if (item._id) {
          return {
            updateOne: {
              filter: {
                _id: item._id
              },
              update: item,
              upsert: true
            }
          };
        }

        return {
          insertOne: {
            document: item
          }
        };
      });

      return model
        .bulkWrite(seed)
        .then(res => {
          console.log(
            "'%s' seed: %d inserted, %d modified",
            modelName,
            res.upsertedCount + res.insertedCount,
            res.modifiedCount
          );
        })
        .catch(err => {
          console.log("'%s' seed error:", modelName, err.message);
        });
    })
  ).then(() => {
    console.log("all seeds done");
  });
}

module.exports.connect = connect;
