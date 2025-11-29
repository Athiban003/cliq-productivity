const mongoose = require("mongoose");
const config = require("./config");

async function connectDb() {
  try {
    await mongoose.connect(config.database.uri);
    console.log("✅ MongoDb connected successfully");
  } catch (err) {
    console.error("❌ DB connection failed", err);
    process.exit(1);
  }
}
module.exports = connectDb;
