const mongoose = require("mongoose");
const dotenv=require('dotenv').config()


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

db.once("open", () => {
    console.log("MongoDB database connected successfully.");
});

module.exports = db;
