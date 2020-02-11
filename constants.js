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
  brgys: brgys
};

// getCSVData(0).then(r => console.log(r));
