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
  const { brgys } = require("./constants");
  const {
    getWeightForHeightLength071,
    getHeightForAge071,
    getWeightForAge071
  } = require("./functions");
  const brgy = brgys[brgy_index];
  const year = parseInt(new Date().getFullYear().toString());

  try {
    const data1 = require(`./data/${parseInt(year) - 2}/${brgy}.json`);
    const data2 = require(`./data/${parseInt(year) - 1}/${brgy}.json`);

    let data = {
      getWeightForAge: [
        getWeightForAge071(data1),
        getWeightForAge071(data2),
        {
          normal: parseInt(
            (getWeightForAge071(data1).normal +
              getWeightForAge071(data2).normal) /
              2
          ),
          overweight: parseInt(
            (getWeightForAge071(data1).overweight +
              getWeightForAge071(data2).overweight) /
              2
          ),
          underweight: parseInt(
            (getWeightForAge071(data1).underweight +
              getWeightForAge071(data2).underweight) /
              2
          ),
          severely_underweight: parseInt(
            (getWeightForAge071(data1).severely_underweight +
              getWeightForAge071(data2).severely_underweight) /
              2
          )
        }
      ],
      getHeightForAge: [
        getHeightForAge071(data1),
        getHeightForAge071(data2),
        {
          normal: parseInt(
            (getHeightForAge071(data1).normal +
              getHeightForAge071(data2).normal) /
              2
          ),
          tall: parseInt(
            (getHeightForAge071(data1).tall + getHeightForAge071(data2).tall) /
              2
          ),
          stunted: parseInt(
            (getHeightForAge071(data1).stunted +
              getHeightForAge071(data2).stunted) /
              2
          ),
          severely_stunted: parseInt(
            (getHeightForAge071(data1).severely_stunted +
              getHeightForAge071(data2).severely_stunted) /
              2
          )
        }
      ],
      getWeightForHeightLength: [
        getWeightForHeightLength071(data1),
        getWeightForHeightLength071(data2),
        {
          normal: parseInt(
            (getWeightForHeightLength071(data1).normal +
              getWeightForHeightLength071(data2).normal) /
              2
          ),
          overweight: parseInt(
            (getWeightForHeightLength071(data1).overweight +
              getWeightForHeightLength071(data2).overweight) /
              2
          ),
          obese: parseInt(
            (getWeightForHeightLength071(data1).obese +
              getWeightForHeightLength071(data2).obese) /
              2
          ),
          wasted: parseInt(
            (getWeightForHeightLength071(data1).wasted +
              getWeightForHeightLength071(data2).wasted) /
              2
          ),
          severely_wasted: parseInt(
            (getWeightForHeightLength071(data1).severely_wasted +
              getWeightForHeightLength071(data2).severely_wasted) /
              2
          )
        }
      ]
    };
    return res.json(data);
  } catch (error) {
    return res.json({ message: "No Available Prediction Missing Data" });
  }
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

server.get("/sample", (req, res) => {
  const file = fs.createReadStream("./data/csv/sample/sample.csv");
  const stat = fs.statSync("./data/csv/sample/sample.csv");
  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "application/csv");
  res.setHeader("Content-Disposition", "attachment; filename=sample.csv");
  file.pipe(res);
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
