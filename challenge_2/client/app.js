"use strict";

$(document).ready(() => {
  const endpoint = "/json";
  const $filterText = $("#json-filter");
  const $jsonText = $("#json-text");
  const $csvText = $("#csv-text");

  $("#json-parser").on("submit", e => {
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
    $.ajax({
      url: endpoint,
      type: "POST",
      data: JSON.stringify(json),
      contentType: "application/json",
      success: function(data) {
        $csvText.html(data.replace(/\n/g, "<br />"));
        $jsonText.val("");
      },
      error: function(err) {
        console.log(err, json);
      }
    });
  };
});
