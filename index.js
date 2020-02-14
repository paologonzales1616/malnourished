const fs = require("fs");
// const csvtojsonV2 = require("csvtojson");
const data = require("./data/2019/san_antonio.json");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const coords = [
    [121.24612910615372, 14.180346914751695],
    [121.2484258788794, 14.180346914751695],
    [121.24598848741454, 14.17807466993311],
    [121.24883201519276, 14.168774378624803],
    [121.24789329652464, 14.177220452436814],
    [121.25159625663315, 14.175175404933455],
    [121.24401064413814, 14.180348559553323],
    [121.24779203709363, 14.18052041128908],
    [121.24974181783631, 14.17012840969511],
    [121.24714211017891, 14.17396657370874],
    [121.24796928988866, 14.175398707824968],
];

data.map(v => {
  v.coords = coords[getRandomInt(coords.length)];

  //   //   delete v["Address or Location of Residence"];
});
fs.writeFileSync("./data/2019/san_antonio.json", JSON.stringify(data));

// const csv=require('csvtojson')
// csv()
// .fromFile("./data/DATA/2019/OPT2019 BAYBAYIN.csv")
// .then((jsonObj)=>{
//     console.log(jsonObj);
// })
