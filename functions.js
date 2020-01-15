function getGender(data) {
  let f = 0;
  let m = 0;
  data.map(v => {
    if (v.Sex == "M") {
      m++;
    } else {
      f++;
    }
  });
  return {
    male: m,
    female: f
  };
}

module.exports = {
  getGender: getGender
};
