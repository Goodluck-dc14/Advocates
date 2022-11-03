require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./utils/db");
const port = process.env.PORT;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "Advocates Server is ready and working fine!" });
  } catch (error) {
    res.status(404).json({ message: "Error locating servers" });
  }
});

app.listen(port, () => {
  console.log("\x1b[32m%s\x1b[0m", "App is 🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️ on port " + port);
});
