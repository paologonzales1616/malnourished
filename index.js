const fs = require("fs");
const { getData } = require("./data.js");

getData(0, 2019).then(val => {
    fs.writeFileSync("./data/2019/anos.json", JSON.stringify(val))
});
