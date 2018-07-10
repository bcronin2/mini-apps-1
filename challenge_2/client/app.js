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
      },
      error: function(err) {
        console.log(err, json);
      }
    });
  };

  const generateTableFromCSV = csv => {
    let rows = csv.split("\n");
    generateRow(rows[0].split(","));
    for (let i = 1; i < rows.length; i++) {
      generateRow(rows[i].split(","));
    }
  };

  const generateRow = fields => {
    let $heading = $("<tr>").appendTo($csvData);
    fields.forEach(field => {
      let $field = $("<td>").text(field);
      $field.appendTo($heading);
    });
  };
});
