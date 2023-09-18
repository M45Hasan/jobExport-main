const mongoose = require("mongoose");

function dbConnect() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Mongo Connected!"))
    .catch((err) => {
      console.log("MongoErro:", err.code);
    });
}

module.exports = dbConnect;
