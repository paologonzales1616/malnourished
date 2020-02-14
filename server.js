require("dotenv").config();
const fs = require("fs");
const express = require("express");
const server = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const port = process.env.PORT || 5000;
const functions = require("./functions.js");
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(logger("dev"));

server.post("/auth", async (req, res) => {
  const admin_username = process.env.ADMIN_USERNAME;
  const admin_password = process.env.ADMIN_PASSWORD;
  const { username, password, brgy } = req.body;
  if (username == admin_username && password == admin_password) {
    return res.json({
      account_type: "admin"
    });
  }
  const accounts = require("./data/accounts/accounts.json");
  const indexTest = accounts.findIndex(
    acc =>
      acc.username == username && acc.password == password && acc.brgy == brgy
  );
  if (indexTest < 0) {
    return res.json({
      status: "fail"
    });
  }
  return res.json({
    index: indexTest,
    status: "success",
    account_type: "user"
  });
});

server.get("/data/:brgy_index/:year", async (req, res) => {
  const { brgys } = require("./constants");
  const brgy_index = req.params.brgy_index;
  const year = req.params.year;
  try {
    const brgyData = require(`./data/${year}/${brgys[brgy_index]}.json`);
    res.json({
      sex: functions.getGender(brgyData),
      age: functions.getAge(brgyData),
      getWeightForAge059: functions.getWeightForAge059(brgyData),
      getHeightForAge059: functions.getHeightForAge059(brgyData),
      getWeightForHeightLength059: functions.getWeightForHeightLength059(
        brgyData
      ),
      getWeightForAge071: functions.getWeightForAge071(brgyData),
      getHeightForAge071: functions.getHeightForAge071(brgyData),
      getWeightForHeightLength071: functions.getWeightForHeightLength071(
        brgyData
      )
    });
  } catch (error) {
    return res.json({ message: "No available data." });
  }
});

server.get("/dataset/:brgy_index/:year", async (req, res) => {
  const { brgys } = require("./constants");
  const { year, brgy_index } = req.params;
  try {
    const brgyData = require(`./data/${year}/${brgys[brgy_index]}.json`);
    return res.json(brgyData);
  } catch (error) {
    return res.json({ message: "No available data." });
  }
});

server.get("/prediction/:brgy_index", async (req, res) => {
  const { brgy_index } = req.params;
  // const { brgys } = require("./constants");
  // const { getHeatmapData } = require("./functions");
  // const brgy = brgy[brgy_index];
  // const year = parseInt(new Date().getFullYear().toString());
  let data = {
    getWeightForAge: [
      {
        normal: 0,
        overweight: 0,
        underweight: 0,
        severely_underweight: 0
      },
      {
        normal: 0,
        overweight: 0,
        underweight: 0,
        severely_underweight: 0
      },
      {
        normal: 0,
        overweight: 0,
        underweight: 0,
        severely_underweight: 0
      }
    ],
    getHeightForAge: [
      {
        normal: 0,
        tall: 0,
        stunted: 0,
        severely_stunted: 0
      },
      {
        normal: 0,
        tall: 0,
        stunted: 0,
        severely_stunted: 0
      },
      {
        normal: 0,
        tall: 0,
        stunted: 0,
        severely_stunted: 0
      }
    ],
    getWeightForHeightLength: [
      {
        normal: 0,
        overweight: 0,
        obese: 0,
        wasted: 0,
        severely_wasted: 0
      },
      {
        normal: 0,
        overweight: 0,
        obese: 0,
        wasted: 0,
        severely_wasted: 0
      },
      {
        normal: 0,
        overweight: 0,
        obese: 0,
        wasted: 0,
        severely_wasted: 0
      }
    ]
  };

 return res.json(data);
});

server.get("/accounts", async (req, res) => {
  const accounts = require("./data/accounts/accounts.json");
  res.json(accounts);
});

server.delete("/accounts", async (req, res) => {
  const { userIndex } = req.body;
  console.log(userIndex);
  const accounts = require("./data/accounts/accounts.json");
  accounts.splice(userIndex, 1);
  fs.writeFileSync("./data/accounts/accounts.json", JSON.stringify(accounts));
  return res.json({
    message: "success"
  });
});

server.post("/accounts", async (req, res) => {
  const { username, password, brgy } = req.body;
  const accounts = require("./data/accounts/accounts.json");
  accounts.push({
    username,
    password,
    brgy
  });
  fs.writeFileSync("./data/accounts/accounts.json", JSON.stringify(accounts));
  return res.json({
    message: "success"
  });
});

server.put("/accounts", async (req, res) => {
  const { index, password } = req.body;
  const accounts = require("./data/accounts/accounts.json");
  accounts[index].password = password;
  fs.writeFileSync("./data/accounts/accounts.json", JSON.stringify(accounts));
  return res.json({
    message: "success"
  });
});

server.get("/heatmap/:year/:option", async (req, res) => {
  const { year, option } = req.params;
  const { getHeatmapData } = require("./functions");
  const data = getHeatmapData(year, option);
  res.json(data);
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
