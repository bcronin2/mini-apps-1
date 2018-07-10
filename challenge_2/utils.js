"use strict";

const parseToCSV = jsonData => {
  let csv = getHeading(jsonData).join(",") + "\n";
  csv += getRows(jsonData).join("\n");
  return csv;
};

const getHeading = jsonData => {
  while (Array.isArray(jsonData)) {
    jsonData = jsonData[0];
  }
  return Object.keys(jsonData).filter(key => key !== "children");
};

const getRows = jsonData => {
  var rows = [];
  if (Array.isArray(jsonData)) {
    jsonData.forEach(jsonDatum => (rows = rows.concat(getRows(jsonDatum))));
  } else {
    rows.push(getRow(jsonData).join(","));
    rows = rows.concat(getRows(jsonData.children));
  }
  return rows;
};

const getRow = jsonObj => {
  let row = [];
  for (let key in jsonObj) {
    if (key !== "children") {
      row.push(jsonObj[key]);
    }
  }
  return row;
};

module.exports = {
  parseToCSV: parseToCSV
};
