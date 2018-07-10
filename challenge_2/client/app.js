"use strict";

$(document).ready(() => {
  const endpoint = "/json";
  const $jsonText = $("#json-text");

  $("#json-parser").on("submit", e => {
    processJSON($jsonText.val());
    e.preventDefault();
  });

  const processJSON = json => {
    $.ajax({
      url: endpoint,
      type: "POST",
      data: json,
      success: function(data) {
        console.log(data);
        $jsonText.val("");
      },
      error: function(err) {}
    });
  };
});
