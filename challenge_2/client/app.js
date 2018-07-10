"use strict";

$(document).ready(() => {
  const endpoint = "/json";
  const $jsonParser = $("#json-parser");
  const $jsonFilter = $("#json-filter");
  const $jsonText = $("#json-text");
  const $csvData = $("#csv-data");

  $jsonParser.on("submit", e => {
    try {
      let json = JSON.parse($jsonText.val());
      processJSON(json);
    } catch (err) {
      console.log("error caught");
    } finally {
      e.preventDefault();
    }
  });

  const processJSON = json => {
    if ($jsonFilter.val()) {
      json.filter = $jsonFilter.val();
    }
    $.ajax({
      url: endpoint,
      type: "POST",
      data: JSON.stringify(json),
      contentType: "application/json",
      success: function(data) {
        generateTableFromCSV(data);
        $jsonText.val("");
        $jsonFilter.val("");
      },
      error: function(err) {
        console.log(err, json);
      }
    });
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
});
