const HOME_SIZE_FACTOR = 2;
const SCHEME_SIZE_FACTOR = 0.75;
const TABLE_SIZE_FACTOR = 1.2;
const PAGE_LIMIT = 20;
const COLORS = new Map();
const PTABLE_COLOR = "ptable";
const JMOL_COLOR = "jmol";
const GREYSCALE_COLOR = "grey";
const BW_COLOR = "bw";

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

function initializeData(data) {
  ELEMENTS = data.elements;
  COLORS = new Map();
  data.elements.forEach((ele) => {
    COLORS.set(ele.symbol.toLowerCase(), ele.schema);
  });
}

function checkElement(element) {
  var i = 0;
  while (
    i < ELEMENTS.length &&
    ELEMENTS[i++].symbol.toLowerCase() !== element.element.toLowerCase()
  );

  return i === ELEMENTS.length
    ? fakeElement(element.element)
    : { ...ELEMENTS[i - 1], real: true };
}

function fakeElement(name) {
  var weight =
    500 + name.charCodeAt(0) + (name.length > 1 ? name.charCodeAt(1) : 0);
  var number =
    ELEMENTS.length +
    name.charCodeAt(0) +
    (name.length > 1 ? name.charCodeAt(1) : 0);

  return { symbol: name, weight, number, real: false };
}

function capitalize(e) {
  return e.charAt(0).toUpperCase() + e.slice(1, e.length);
}

function getColor(ele, color) {
  switch (color) {
    case PTABLE_COLOR:
      return COLORS[ele.symbol.toLowerCase()]
        ? COLORS[ele.symbol.toLowerCase()].ptable
        : stringToColor(ele, color);
    case JMOL_COLOR:
      return COLORS[ele.symbol.toLowerCase()]
        ? COLORS[ele.symbol.toLowerCase()].jmol
        : stringToColor(ele, color);
    case GREYSCALE_COLOR:
      return COLORS[ele.symbol.toLowerCase()]
        ? COLORS[ele.symbol.toLowerCase()].grey
        : generateGrey(ele);
    case BW_COLOR:
      return generateBlackWhite(ele);
  }

  return stringToColor(ele);
}

//https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
function isLight(c) {
  var rgb = parseInt(c, 16); // convert rrggbb to decimal
  var r = (rgb >> 16) & 0xff; // extract red
  var g = (rgb >> 8) & 0xff; // extract green
  var b = (rgb >> 0) & 0xff; // extract blue

  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  return luma < 60 ? "white" : "black";
}

function generateGrey(ele, color) {
  var code = ele.weight;
  var bg = code.toString(16) + code.toString(16);

  bg = ele.weight % 2 ? bg.slice(0, 2) : bg.slice(0, 2)[1] + bg.slice(0, 2)[0];

  bg = bg + bg + bg;
  return {
    stroke: isLight(bg),
    bg: bg,
  };
}

function generateBlackWhite(ele) {
  return {
    stroke: "black",
    bg: "white",
  };
}

function stringToColor(ele) {
  var code = ele.weight;
  var bg = code.toString(16);
  if (code >= 100) bg = code * 1000 + code;
  else if (code >= 10) bg = code * 10000 + code * 100 + code;

  return {
    stroke: isLight(bg),
    bg: bg,
  };
}

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

function setInputKeyDownEventHandler() {
  $("form input").keydown((e) => {
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
  });
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

function setWindowScrollEventHandler() {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $("#back-to-top").fadeIn();
    } else {
      $("#back-to-top").fadeOut();
    }
  });
}

function setBackToTopHandler() {
  // scroll body to 0px on click
  $("#back-to-top").click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      400
    );
    return false;
  });
}

function setShowGenerateHandler() {
  $("#btn-show").on("click", () => {
    word = $("#word-show").val().toLowerCase();
    if (validateShowResult(word)) {
      $("#resultShow").empty();
      printResult(word, $("input[name='colorRadio-show']:checked").val(), true);
    } else {
      if (word) alert(`${word} is not a valid string`);
    }
  });
}

function setGenerateHandler() {
  $("#btn").on("click", () => {
    onClick(algWorker, $("#word").val().toLowerCase());
  });
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

function setHandlers() {
  setMoreHandler();
  setInputKeyDownEventHandler();
  setGenerateHandler();
  setShowGenerateHandler();
  setBackToTopHandler();
  setWindowScrollEventHandler();
}

function createWorker() {
  var worker = new Worker("algorithm.js");

  worker.onmessage = function (e) {
    results = Array();
    currentPage = 1;
    e.data.forEach((e) => results.push(e));
    //  pagination(results.length);
    printResults(results);
    restore();
  };
  return worker;
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
