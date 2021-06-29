const HOME_SIZE_FACTOR = 2;
const TABLE_SIZE_FACTOR = 1.2;
function printElement(container, classes, sizeFactor, element, stroke, fill) {
  var model = $("#model").clone();
  var strokeColor = stroke ? stroke : "black";
  var fillColor = fill ? fill : "white";
  var config = element.name
    ? {
        numberY: 10,
        numberX: 2,
        numberFontSize: 10,
        numberAnchor: "start",
        weightFontSize: 10,
        weightY: 10,
        weightX: 48,
        symbolY: 34,
      }
    : {
        numberY: 46,
        numberX: 25,
        numberFontSize: 10,
        numberAnchor: "middle",
        weightFontSize: 10,
        weightY: 10,
        weightX: 48,
        symbolY: 33.5,
      };
  model
    .removeClass("d-none")
    .addClass(classes)
    .attr("id", "")
    .find("svg")
    .attr("style", "background-color:" + fillColor)
    .attr("width", 50 * sizeFactor)
    .attr("height", 50 * sizeFactor)
    .find("g")
    .find("rect")
    .attr("stroke", strokeColor)
    .attr("stroke-width", 1 * sizeFactor)
    .attr("width", 48 * sizeFactor)
    .attr("height", 48 * sizeFactor)
    .attr("y", 1 * sizeFactor)
    .attr("x", 1 * sizeFactor)
    .attr("fill", "none")
    .end()
    .find("#symbol")
    .text(capitalize(element.symbol))
    .attr("fill", strokeColor)
    .attr("font-size", 25 * sizeFactor)
    .attr("y", config.symbolY * sizeFactor)
    .attr("x", 25 * sizeFactor)
    .attr("text-anchor", "middle")
    .attr("font-family", "serif");

  if (element.name) {
    model
      .find("#name")
      .text(capitalize(element.name))
      .attr("fill", strokeColor)
      .attr("font-size", 7.5 * sizeFactor)
      .attr("y", 45.5 * sizeFactor)
      .attr("x", 25 * sizeFactor)
      .attr("text-anchor", "middle")
      .attr("font-family", "serif");
    model
      .find("#link")
      .attr("href", "https://en.wikipedia.org/wiki/" + element.name)
      .attr("target", "_blank");
  }

  model
    .find("#weight")
    .text(element.weight)
    .attr("fill", strokeColor)
    .attr("font-size", config.weightFontSize * sizeFactor)
    .attr("y", config.weightY * sizeFactor)
    .attr("x", config.weightX * sizeFactor)
    .attr("text-anchor", "end")
    .attr("font-family", "serif")
    .end()
    .find("#number")
    .text(element.number)
    .attr("fill", strokeColor)
    .attr("font-size", config.numberFontSize * sizeFactor)
    .attr("y", config.numberY * sizeFactor)
    .attr("x", config.numberX * sizeFactor)
    .attr("text-anchor", config.numberAnchor)
    .attr("font-family", "serif");

  container.append($(model));
}

function printResult(result, color, onlyReal) {
  var container = $(onlyReal ? "#resultsReal" : "#resultsNotReal");
  result.forEach(function (element) {
    var ele = checkElement(element);
    ele.name = null; // remove element name from home page, to account for fake elements
    var colorObj = getColor(ele.symbol, color);
    printElement(
      $("#result #content"),
      "m-2",
      HOME_SIZE_FACTOR,
      ele,
      colorObj.stroke,
      colorObj.bg
    );
  });
  var newResult = $("#result").clone();
  if (onlyReal) {
    $(newResult).removeClass("d-none border-info");
  } else {
    $(newResult).removeClass("d-none border-success");
  }
  newResult.attr("id", "");

  $("#result #content").empty();
  if (!container.children().length) container.empty();
  container.append(newResult);
}

function clickOnReturn(e) {
  if (e.keyCode == 13) {
    $("#btn").click();
    e.preventDefault();
    return false;
  }

  if (
    e.keyCode !== 8 &&
    e.keyCode !== 16 &&
    e.keyCode !== 93 &&
    e.keyCode !== 20 &&
    validateKey(e)
  ) {
    e.preventDefault();
    return false;
  }
}

function validateInput(word) {
  return (
    word.length ===
    Array.from(word).filter((e) => validateKey({ keyCode: e })).length
  );
}

function validateKey(e) {
  return (
    (e.keyCode.charCodeAt(0) >= "A".charCodeAt(0) && //A = 65
      e.keyCode.charCodeAt(0) <= "Z".charCodeAt(0)) || //Z = 90
    (e.keyCode.charCodeAt(0) >= "a".charCodeAt(0) && // a = 97
      e.keyCode.charCodeAt(0) <= "z".charCodeAt(0)) // z = 122
  );
}

function loading() {
  $("#btn-loader").removeClass("d-none");
  $("#btn").attr("disabled", true);
}

function generate(results) {
  $(".element-container").text("No results");
  $("#options").removeClass("d-none");
  const color = $("input[name='colorRadio']:checked");
  var result = results.map((element) => {
    return { element, real: checkResult(element) };
  });

  result.forEach((element, index) => {
    printResult(element.element, color, element.real);
  });
  $("#btn-real").html($("#resultsReal").children().length);
  $("#btn-fake").html($("#resultsNotReal").children().length);
  $("#resultsReal,#resultsNotReal").parent().collapse("show");
}

function restore() {
  $("#btn-loader").addClass("d-none");
  $("#btn").attr("disabled", false);
}

function printColorRow(e, color) {
  var row = $("#colorRow").clone();
  row.attr("id", "").removeClass("d-none");

  printElement(
    row.find("#ptable"),
    "",
    HOME_SIZE_FACTOR,
    e,
    COLORS[e.symbol].ptable.stroke,
    COLORS[e.symbol].ptable.bg
  );
  printElement(
    row.find("#jmol"),
    "",
    HOME_SIZE_FACTOR,
    e,
    COLORS[e.symbol].jmol.stroke,
    COLORS[e.symbol].jmol.bg
  );
  printElement(
    row.find("#greyscale"),
    "",
    HOME_SIZE_FACTOR,
    e,
    COLORS[e.symbol].grey.stroke,
    COLORS[e.symbol].grey.bg
  );
  $("#tableColors").append(row);
}

function printColorTable() {
  ELEMENTS.forEach((e) => {
    console.log(e);
    printColorRow(e, COLORS[e.symbol]);
  });
}

function printPeriodicTable() {
  ELEMENTS.forEach((e) => {
    printElement(
      $("td#" + e.number),
      "",
      TABLE_SIZE_FACTOR,
      e,
      COLORS[e.symbol].ptable.stroke,
      COLORS[e.symbol].ptable.bg
    );
  });
}
