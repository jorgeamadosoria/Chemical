const HOME_SIZE_FACTOR = 2;
const SCHEME_SIZE_FACTOR = 0.75;
const TABLE_SIZE_FACTOR = 1.2;
const namedElementConfig = {
  numberY: 10,
  numberX: 2,
  numberFontSize: 10,
  numberAnchor: "start",
  weightFontSize: 10,
  weightY: 10,
  weightX: 48,
  symbolY: 34,
};
const unnamedElementConfig = {
  numberY: 46,
  numberX: 25,
  numberFontSize: 10,
  numberAnchor: "middle",
  weightFontSize: 10,
  weightY: 10,
  weightX: 48,
  symbolY: 33.5,
};

const resultTemplate = $("#result");
const realResContainer = $("#resultsReal");
const showContainer = $("#resultShow");
const modelTemplate = $("#model");

function printElement(sizeFactor, element, color, classes = "") {
  const colorCfg = getColor(element, color);
  var model = modelTemplate.clone();
  var strokeColor = colorCfg.stroke ? colorCfg.stroke : "black";
  var fillColor = colorCfg.bg ? colorCfg.bg : "white";
  var config = element.name ? namedElementConfig : unnamedElementConfig;
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
    .attr("stroke-width", sizeFactor)
    .attr("width", "96%")
    .attr("height", "96%")
    .attr("y", sizeFactor)
    .attr("x", sizeFactor)
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

  return model;
}

function onClick(worker, word) {
  if (validateInput(word)) {
    loading();
    algWorker.postMessage([word, ELEMENTS]);
  } else {
    if (word) alert(`${word} is not a valid input`);
    $("#resultsReal").empty();
    $("#more").addClass("d-none");
    $("#word").val("");
  }
}

function executeWithUrlParams(worker) {
  var searchParams = new URLSearchParams(window.location.search);
  var execute = false;
  var word = "";
  if (searchParams.has("word")) {
    word = searchParams.get("word").toLowerCase();
    $("#word").val(word);
    execute = true;
  }
  if (searchParams.has("color")) {
    $("#" + searchParams.get("color").toLowerCase()).prop("checked", true);
  }
  if (execute) onClick(worker, word);
}

function validateShowResult(result) {
  return result
    .split(",")
    .every(
      (ele) => ele.trim().length <= 2 && ele.trim().match(/^[A-Za-z]{1,2}$/g)
    );
}

function prepareShowResult(result) {
  var result = {
    elements: result.split(",").map((ele) => {
      return {
        element: ele.trim(),
        real: COLORS[ele.toLowerCase()] ? true : false,
      };
    }),
    real: false,
  };

  result.real = result.elements.every((r) => r.real);

  return result;
}

function printResult(result, color, isShow = false) {
  var newResult = resultTemplate.clone();
  newResult.attr("id", "");

  result = isShow ? prepareShowResult(result) : result;
  result.elements.forEach((e) => {
    ele = checkElement(e);
    ele.name = null; // remove element name from home page, to account for fake elements
    newResult
      .find("#content")
      .append(printElement(HOME_SIZE_FACTOR, ele, color, "m-2"));
  });
  appendToContainer(result.real, newResult, isShow);
}

function appendToContainer(isReal, jqueryElement, isShow) {
  var container = isShow ? showContainer : realResContainer;
  // if (!container.children().length) container.empty();
  jqueryElement.removeClass(
    isReal ? "d-none border-info" : "d-none border-success"
  );
  container.append(jqueryElement);
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

function clickOnReturnShow(e) {
  if (e.keyCode == 13) {
    $("#btn-show").click();
    e.preventDefault();
    return false;
  }

  if (
    e.keyCode !== 8 &&
    e.keyCode !== 16 &&
    e.keyCode !== 93 &&
    e.keyCode !== 20 &&
    validateKey(e, true)
  ) {
    e.preventDefault();
    return false;
  }
}

function validateInput(word) {
  return (
    word.length &&
    word.length ===
      Array.from(word).filter((e) => validateKey({ keyCode: e })).length
  );
}

function validateKey(e, includeComma = false) {
  return (
    e &&
    e.keyCode &&
    ((e.keyCode >= "A" && //A = 65
      e.keyCode <= "Z") || //Z = 90
      (e.keyCode >= "a" && // a = 97
        e.keyCode <= "z") || // z = 122
      (includeComma && e.keyCode === ","))
  );
}

function loading() {
  $("#count #real").html(0);
  $("#count #fake").html(0);
  $("#btn-loader").removeClass("d-none");
  $("#btn").attr("disabled", true);
}

function setMoreHandler() {
  $("#more").on("click", () => {
    printPage(
      results,
      currentPage,
      $("input[name='colorRadio']:checked").val()
    );
    currentPage++;
    if ((currentPage - 1) * PAGE_LIMIT >= results.length)
      $("#more").addClass("d-none");
  });
}

function printResults(results) {
  $(".element-container").text("No results");

  const color = $("input[name='colorRadio']:checked").val();

  realCount = 0;
  fakeCount = 0;
  results.forEach((e) => (e.real ? realCount++ : fakeCount++));
  $("#count #real").html(realCount);
  $("#count #fake").html(fakeCount);

  if (results.length) $("#resultsReal").empty();

  results.sort((e1, e2) => {
    res = e2.real - e1.real;
    if (!res) return e1.elements.length - e2.elements.length;
    return res;
  });

  printPage(results, currentPage++, color);
}

function printPage(results, pageIndex, color) {
  var page = results.slice(
    (pageIndex - 1) * PAGE_LIMIT,
    pageIndex * PAGE_LIMIT
  );
  page.forEach((result) => printResult(result, color));

  if (results.length > PAGE_LIMIT) $("#more").removeClass("d-none");
}

function restore() {
  $("#btn-loader").addClass("d-none");
  $("#btn").attr("disabled", false);
}

function printColorRow(e) {
  const color = COLORS[e.symbol.toLowerCase()];
  var row = $("#colorRow").clone();
  row.attr("id", "").removeClass("d-none");

  row
    .find("#ptable")
    .append(printElement(SCHEME_SIZE_FACTOR, e, PTABLE_COLOR))
    .end()
    .find("#jmol")
    .append(printElement(SCHEME_SIZE_FACTOR, e, JMOL_COLOR))
    .end()
    .find("#greyscale")
    .append(printElement(SCHEME_SIZE_FACTOR, e, GREYSCALE_COLOR));

  $("#tableColors").append(row);
}

function printColorTable() {
  ELEMENTS.forEach((e) => {
    printColorRow(e);
  });
}

function printPeriodicTable() {
  ELEMENTS.forEach((e) => {
    $("td#" + e.number).append(
      printElement(TABLE_SIZE_FACTOR, e, PTABLE_COLOR)
    );
  });
}
