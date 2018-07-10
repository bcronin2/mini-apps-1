"use strict";

const parseToCSV = jsonData => {
  let csv = getHeading(jsonData).join(",") + "\n\r";
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
  var rows = [];
  if (Array.isArray(jsonData)) {
    jsonData.forEach(jsonDatum => (rows = rows.concat(getRows(jsonDatum))));
  } else {
    rows.push(getRow(jsonData));
    rows = rows.concat(getRows(jsonData.children));
  }
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

module.exports = {
  parseToCSV: parseToCSV
};
