// const csv = require("csvtojson");

const brgys = [
  "anos",
  "bagong_silang",
  "bambang",
  "batong_malake",
  "baybayin",
  "bayog",
  "lalakay",
  "maahas",
  "malinta",
  "mayondon",
  "putho_tuntungin",
  "san_antonio",
  "tadlac",
  "timugan"
];

const heatmap_options = [
  {
    option: "HEIGHT FOR AGE SUMMARY (Normal)",
    key: "Height for Age Status",
    value: "N"
  },
  {
    option: "HEIGHT FOR AGE SUMMARY (Tall)",
    key: "Height for Age Status",
    value: "T"
  },
  {
    option: "HEIGHT FOR AGE SUMMARY (Stunted)",
    key: "Height for Age Status",
    value: "St"
  },
  {
    option: "HEIGHT FOR AGE SUMMARY (Severely Stunted)",
    key: "Height for Age Status",
    value: "SSt"
  },
  {
    option: "WEIGHT FOR AGE SUMMARY (Normal)",
    key: "Weight for Age Status",
    value: "N"
  },
  {
    option: "WEIGHT FOR AGE SUMMARY (Overweight)",
    key: "Weight for Age Status",
    value: "OW"
  },
  {
    option: "WEIGHT FOR AGE SUMMARY (Underweight)",
    key: "Weight for Age Status",
    value: "UW"
  },
  {
    option: "WEIGHT FOR AGE SUMMARY (Severely Underweight)",
    key: "Weight for Age Status",
    value: "SUW"
  },
  {
    option: "WEIGHT FOR HEIGHT/LENGTH SUMMARY (Normal)",
    key: "Height for Length/Height Status",
    value: "N"
  },
  {
    option: "WEIGHT FOR HEIGHT/LENGTH SUMMARY (Overweight)",
    key: "Height for Length/Height Status",
    value: "OW"
  },
  {
    option: "WEIGHT FOR HEIGHT/LENGTH SUMMARY (Obese)",
    key: "Height for Length/Height Status",
    value: "O"
  },
  {
    option: "WEIGHT FOR HEIGHT/LENGTH SUMMARY (Wasted)",
    key: "Height for Length/Height Status",
    value: "W"
  },
  {
    option: "WEIGHT FOR HEIGHT/LENGTH SUMMARY (Severly Wasted)",
    key: "Height for Length/Height Status",
    value: "SW"
  }
];

// async function getCSVData(brgy_index, year) {
//   const brgy = brgys[brgy_index];
//   try {
//     const data = await csv().fromFile("./data/" + year + "/" + brgy + ".csv");
//     return data;
//   } catch (error) {
//     console.log(error)
//     return [];
//   }
// }

module.exports = {
  brgys: brgys,
  heatmap_options: heatmap_options
};

// getCSVData(0).then(r => console.log(r));
