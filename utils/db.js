const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("database now connected");
});

module.exports = mongoose;
