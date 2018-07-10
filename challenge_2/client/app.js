"use strict";

$(document).ready(() => {
  const endpoint = "/json";
  const $jsonText = $("#json-text");

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
        $jsonText.val("");
      },
      error: function(err) {
        console.log(err, json);
      }
    });
  };
});
