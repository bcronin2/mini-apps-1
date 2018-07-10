"use strict";

let rowId = 1;

const parseToCSV = jsonData => {
  let fields = getHeading(jsonData);
  let csv = `id,parentId,${fields.join(",")}\n`;
  csv += getRows(jsonData, fields).join("\n");
  console.log(csv);
  return csv;
};

const getHeading = jsonData => {
  while (Array.isArray(jsonData)) {
    jsonData = jsonData[0];
  }
  return Object.keys(jsonData).filter(key => key !== "children");
};

const getRows = (jsonData, fields, parentId) => {
  var rows = [];
  if (Array.isArray(jsonData)) {
    jsonData.forEach(
      jsonDatum => (rows = rows.concat(getRows(jsonDatum, fields, parentId)))
    );
  } else {
    rows.push(
      `${rowId},${parentId || ""},${getRow(jsonData, fields).join(",")}`
    );
    rows = rows.concat(getRows(jsonData.children, fields, rowId++));
  }
  return rows;
};

const getRow = (jsonObj, fields) => {
  let row = [];
  fields.forEach(field => {
    row.push(jsonObj[field] || "");
  });
  return row;
};

module.exports = {
  parseToCSV: parseToCSV
};
