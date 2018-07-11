"use strict";

$(document).ready(() => {
  const endpoint = "/json";
  const $jsonParser = $("#json-parser");
  const $jsonFilter = $("#json-filter");
  const $jsonText = $("#json-text");
  const $jsonFile = $("#json-file");
  const $csvData = $("#csv-data");

  $jsonFile.on("click", () => $jsonText.val(""));
  $jsonText.on("click", () => $jsonFile.val(""));

  $jsonParser.on("submit", e => {
    if ($jsonFile.get(0).files.length) {
      parseFromFile();
    } else {
      $jsonText.html("");
      parseJSON($jsonText.val());
    }
    e.preventDefault();
  });

  const parseFromFile = () => {
    let inputFile = $jsonFile.get(0).files[0];
    readAsTextAsync(inputFile).then(parseJSON);
  };

  const parseJSON = jsonStr => {
    let jsonObj = processJSON(jsonStr);
    $.ajax({
      url: endpoint,
      type: "POST",
      data: JSON.stringify(jsonObj),
      contentType: "application/json",
      success: function(data) {
        generateTableFromCSV(data);
        $jsonText.val("");
        $jsonFilter.val("");
        $jsonFile.val("");
      },
      error: function(err) {
        console.log(err, jsonStr);
      }
    });
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

  const generateTableFromCSV = csv => {
    $csvData.html("");
    let rows = csv.split("\n");
    rows.forEach((row, index) => generateRow(row.split(","), index));
  };

  const generateRow = (fields, index) => {
    let $heading = $("<tr>").appendTo($csvData);
    fields.forEach(field => {
      let $field = $(index ? "<td>" : "<th>").text(field);
      $field.appendTo($heading);
    });
  };

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
});
