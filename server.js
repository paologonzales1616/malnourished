require("dotenv").config();
const express = require("express");
const server = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const port = process.env.PORT || 5000;
const data = require("./data.js");
const functions = require("./functions.js");
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(logger("dev"));



server.get("/data/:brgy_index/:year", async (req, res) => {
  const brgy_index = req.params.brgy_index;
  const year = req.params.year
  const brgyData = await data.getData(parseInt(brgy_index), year);
  if (brgyData.length == 0) {
    return res.json({ message: "No available data." });
  }
  res.json({ sex: functions.getGender(brgyData) });
});

// Serve the static files from the React app
server.use(express.static(path.join(__dirname, "client/build")));

// Handles any requests that don't match the ones above
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
