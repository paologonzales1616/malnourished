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

function getWeightForAge059(data) {
  let normal = 0;
  let overweight = 0;
  let underweight = 0;
  let severely_underweight = 0;

  data.map(v => {
    const age = parseInt(v["Age in Months"]);
    if (age < 60) {
      const weight = v["Weight for Age Status"];
      if (weight == "N") {
        normal++;
      } else if (weight == "OW") {
        overweight++;
      } else if (weight == "UW") {
        underweight++;
      } else if (weight == "SUW") {
        severely_underweight++;
      }
    }
  });

  return {
    normal,
    overweight,
    underweight,
    severely_underweight
  };
}

function getHeightForAge059(data) {
  let normal = 0;
  let tall = 0;
  let stunted = 0;
  let severely_stunted = 0;
  data.map(v => {
    const age = parseInt(v["Age in Months"]);
    if (age < 60) {
      const height = v["Height for Age Status"];
      if (height == "N") {
        normal++;
      } else if (height == "T") {
        tall++;
      } else if (height == "St" || height == "S") {
        stunted++;
      } else if (height == "SSt" || height == "SS") {
        severely_stunted++;
      }
    }
  });
  return {
    normal,
    tall,
    stunted,
    severely_stunted
  };
}

function getWeightForHeightLength059(data) {
  let normal = 0;
  let overweight = 0;
  let obese = 0;
  let wasted = 0;
  let severely_wasted = 0;
  data.map(v => {
    const age = parseInt(v["Age in Months"]);
    if (age < 60) {
      const height = v["Height for Length/Height Status"];
      if (height == "N") {
        normal++;
      } else if (height == "OW") {
        overweight++;
      } else if (height == "O") {
        obese++;
      } else if (height == "W") {
        wasted++;
      } else if (height == "SW") {
        severely_wasted++;
      }
    }
  });
  return {
    normal,
    overweight,
    obese,
    wasted,
    severely_wasted
  };
}

function getWeightForAge071(data) {
  let normal = 0;
  let overweight = 0;
  let underweight = 0;
  let severely_underweight = 0;

  data.map(v => {
    const weight = v["Weight for Age Status"];
    if (weight == "N") {
      normal++;
    } else if (weight == "OW") {
      overweight++;
    } else if (weight == "UW") {
      underweight++;
    } else if (weight == "SUW") {
      severely_underweight++;
    }
  });

  return {
    normal,
    overweight,
    underweight,
    severely_underweight
  };
}

function getHeightForAge071(data) {
  let normal = 0;
  let tall = 0;
  let stunted = 0;
  let severely_stunted = 0;
  data.map(v => {
    const height = v["Height for Age Status"];
    if (height == "N") {
      normal++;
    } else if (height == "T") {
      tall++;
    } else if (height == "St" || height == "S") {
      stunted++;
    } else if (height == "SSt" || height == "SS") {
      severely_stunted++;
    }
  });
  return {
    normal,
    tall,
    stunted,
    severely_stunted
  };
}

function getWeightForHeightLength071(data) {
  let normal = 0;
  let overweight = 0;
  let obese = 0;
  let wasted = 0;
  let severely_wasted = 0;
  data.map(v => {
    const height = v["Height for Length/Height Status"];
    if (height == "N") {
      normal++;
    } else if (height == "OW") {
      overweight++;
    } else if (height == "O") {
      obese++;
    } else if (height == "W") {
      wasted++;
    } else if (height == "SW") {
      severely_wasted++;
    }
  });
  return {
    normal,
    overweight,
    obese,
    wasted,
    severely_wasted
  };
}

module.exports = {
  getGender: getGender,
  getAge: getAge,
  getWeightForAge059: getWeightForAge059,
  getHeightForAge059: getHeightForAge059,
  getWeightForHeightLength059: getWeightForHeightLength059,
  getWeightForAge071: getWeightForAge071,
  getHeightForAge071: getHeightForAge071,
  getWeightForHeightLength071: getWeightForHeightLength071
};
