"use strict";

const parseToCSV = jsonData => {
  let csv = getHeading(jsonData).join(",") + "\n";
  csv += getRows(jsonData);
  return csv;
};

const getHeading = jsonData => {
  while (Array.isArray(jsonData)) {
    jsonData = jsonData[0];
  }
  return Object.keys(jsonData).filter(key => key !== "children");
};

const getRows = jsonData => {
  let flatJSON = flattenJSON(jsonData);
  let rows = [];
  flatJSON.forEach(obj => rows.push(getRow(obj)));
  return rows.join("\n");
};

const getRow = jsonObj => {
  let row = [];
  for (let key in jsonObj) {
    if (key !== "children") {
      row.push(jsonObj[key]);
    }
  }
  return row.join(",");
};

const flattenJSON = jsonData => {
  var flatJSON = [];
  if (Array.isArray(jsonData)) {
    jsonData.forEach(
      jsonDatum => (flatJSON = flatJSON.concat(flattenJSON(jsonDatum)))
    );
  } else {
    let obj = {};
    for (let key in jsonData) {
      if (key !== "children") {
        obj[key] = jsonData[key];
      } else {
        flatJSON = flatJSON.concat(flattenJSON(jsonData[key]));
      }
    }
    flatJSON.push(obj);
  }
  return flatJSON;
};

module.exports = {
  parseToCSV: parseToCSV
};
