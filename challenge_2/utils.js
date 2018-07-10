"use strict";

let rowId = 1;

const parseToCSV = jsonData => {
  let csv = `id,parentId,${getHeading(jsonData).join(",")}\n`;
  csv += getRows(jsonData).join("\n");
  console.log(csv);
  return csv;
};

const getHeading = jsonData => {
  while (Array.isArray(jsonData)) {
    jsonData = jsonData[0];
  }
  return Object.keys(jsonData).filter(key => key !== "children");
};

const getRows = (jsonData, parentId) => {
  var rows = [];
  if (Array.isArray(jsonData)) {
    jsonData.forEach(
      jsonDatum => (rows = rows.concat(getRows(jsonDatum, parentId)))
    );
  } else {
    rows.push(`${rowId},${parentId || ""},${getRow(jsonData).join(",")}`);
    rows = rows.concat(getRows(jsonData.children, rowId++));
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
