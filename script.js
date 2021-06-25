var SIZE_FACTOR = 2;
function printElement(sizeFactor, element, strokeColor, fillColor) {
  var model = $("#model").clone();
  model
    .removeClass("d-none")
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
    .find("#name")
    .text(element.symbol)
    .attr("fill", strokeColor)
    .attr("font-size", 25 * sizeFactor)
    .attr("y", 31.5 * sizeFactor)
    .attr("x", 25 * sizeFactor)
    .attr("text-anchor", "middle")
    .attr("font-family", "serif")
    .end()
    .find("#weight")
    .text(element.weight)
    .attr("fill", strokeColor)
    .attr("font-size", 6 * sizeFactor)
    .attr("y", 7 * sizeFactor)
    .attr("x", 48 * sizeFactor)
    .attr("text-anchor", "end")
    .attr("font-family", "serif")
    .end()
    .find("#number")
    .text(element.number)
    .attr("fill", strokeColor)
    .attr("font-size", 10 * sizeFactor)
    .attr("y", 46 * sizeFactor)
    .attr("x", 25 * sizeFactor)
    .attr("text-anchor", "middle")
    .attr("font-family", "serif");

  $("#result #content").append($(model));
}

function printResult(result, onlyReal) {
  result.forEach(function (element) {
    var ele = checkElement(element);
    printElement(
      SIZE_FACTOR,
      ele,
      ele.real ? "black" : "grey",
      ele.real ? "grey" : "black"
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
  $("#results").append(newResult);
}

function algorithm(word) {
  var results = [[word[0]]];

  for (var i = 1; i < word.length; i++) {
    var len = results.length;
    for (var j = 0; j < len; j++) {
      if (results[j][results[j].length - 1].length === 1) {
        const newResult = [...results[j], word[i]];
        results[j][results[j].length - 1] =
          results[j][results[j].length - 1] + word[i];
        results.push(newResult);
      } else {
        results[j].push(word[i]);
      }
    }
  }

  return results;
}

function capitalize(e) {
  return e.charAt(0).toUpperCase() + (e.length === 2 ? e[1] : "");
}
