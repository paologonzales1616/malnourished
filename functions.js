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

function getAge(data) {
  let age_0_5 = 0;
  let age_6_11 = 0;
  let age_12_23 = 0;
  let age_24_35 = 0;
  let age_36_47 = 0;
  let age_48_59 = 0;
  let age_60_71 = 0;
  data.map(v => {
    const age = parseInt(v["Age in Months"]);
    if (age < 6) {
      age_0_5++;
    } else if (age > 5 && age < 12) {
      age_6_11++;
    } else if (age > 12 && age < 24) {
      age_12_23++;
    } else if (age > 23 && age < 36) {
      age_24_35++;
    } else if (age > 35 && age < 48) {
      age_36_47++;
    } else if (age > 47 && age < 60) {
      age_48_59++;
    } else if (age > 59) {
      age_60_71++;
    }
  });

  return {
    age_0_5,
    age_6_11,
    age_12_23,
    age_24_35,
    age_36_47,
    age_48_59,
    age_60_71
  };
}

module.exports = {
  getGender: getGender,
  getAge: getAge
};
