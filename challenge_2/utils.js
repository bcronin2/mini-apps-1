"use strict";

let rowId;

const parseToCSV = jsonData => {
  rowId = 1;
  let fields = getHeading(jsonData);
  let csv = `id,parentId,${fields.join(",")}\n`;
  csv += getRows(jsonData, fields, jsonData.filter).join("\n");
  return csv;
};

const getHeading = jsonData => {
  while (Array.isArray(jsonData)) {
    jsonData = jsonData[0];
  }
  return Object.keys(jsonData).filter(
    key => key !== "children" && key !== "filter"
  );
};

const getRows = (jsonData, fields, filter, parentId) => {
  let rows = [];
  if (Array.isArray(jsonData)) {
    jsonData.forEach(
      jsonDatum =>
        (rows = rows.concat(getRows(jsonDatum, fields, filter, parentId)))
    );
  } else {
    let row = getRow(jsonData, fields, filter);
    if (row) {
      rows.push(`${rowId},${parentId || ""},${row.join(",")}`);
      rows = rows.concat(getRows(jsonData.children, fields, filter, rowId++));
    }
  }
  return rows;
};

const getRow = (jsonObj, fields, filter) => {
  let row = [];
  for (let i = 0; i < fields.length; i++) {
    let fieldVal = jsonObj[fields[i]];
    if (fieldVal === filter && filter) {
      return null;
    }
    row.push(fieldVal || "");
  }
  return row;
};

module.exports = {
  parseToCSV: parseToCSV
};
