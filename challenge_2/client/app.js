"use strict";

$(document).ready(() => {
  const endpoint = "/csv";

  const $jsonParser = $("#json-parser");
  const $jsonFilter = $("#json-filter");
  const $jsonText = $("#json-text");
  const $jsonFile = $("#json-file");
  const $allData = $("#all-data");
  const $noData = $("#no-data");
  const $csvData = $("#csv-data");

  const parseFromFile = () => {
    let inputFile = $jsonFile.get(0).files[0];
    readAsTextAsync(inputFile).then(uploadJSON);
  };

  const processJSON = jsonStr => {
    try {
      let json = JSON.parse(jsonStr);
      if ($jsonFilter.val()) {
        json.filter = $jsonFilter.val();
      }
      return json;
    } catch (err) {
      alert(err);
    }
  };

  const retrieveCSVs = () => {
    $.ajax({
      url: endpoint,
      type: "GET",
      success: function(data) {
        refreshData(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  };

  const uploadJSON = jsonStr => {
    let jsonObj = processJSON(jsonStr);
    $.ajax({
      url: endpoint,
      type: "POST",
      data: JSON.stringify(jsonObj),
      contentType: "application/json",
      success: function(data) {
        refreshData([data]);
        $jsonText.val("");
        $jsonFilter.val("");
        $jsonFile.val("");
      },
      error: function(err) {
        console.log(err, jsonStr);
      }
    });
  };

  const hideData = () => $csvData.html("");

  const refreshData = csvs => {
    hideData();
    csvs.forEach(csv => generateTableFromCSV(csv).appendTo($csvData));
  };

  const generateTableFromCSV = csv => {
    let $csvTable = $("<table>");
    let rows = csv.split("\n");
    rows.forEach((row, index) =>
      generateRow(row.split(","), index).appendTo($csvTable)
    );
    return $csvTable;
  };

  const generateRow = (fields, index) => {
    let $heading = $("<tr>");
    fields.forEach(field => {
      let $field = $(index ? "<td>" : "<th>").text(field);
      $field.appendTo($heading);
    });
    return $heading;
  };

  $jsonFile.on("click", () => $jsonText.val(""));
  $jsonText.on("click", () => $jsonFile.val(""));

  $allData.on("click", () => {
    retrieveCSVs();
    $allData.toggle();
    $noData.toggle();
  });
  $noData.on("click", () => {
    hideData();
    $allData.toggle();
    $noData.toggle();
  });

  $jsonParser.on("submit", e => {
    if ($jsonFile.get(0).files.length) {
      parseFromFile();
    } else {
      $jsonText.html("");
      uploadJSON($jsonText.val());
    }
    e.preventDefault();
  });
});

const readAsTextAsync = file => {
  const fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.readAsText(file);
  });
};
