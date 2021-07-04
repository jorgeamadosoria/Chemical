function algorithm(word, realElements) {
  var results = [[create(word[0], realElements)]];
  for (var i = 1; i < word.length; i++) {
    var len = results.length;
    for (var j = 0; j < len; j++) {
      if (results[j][results[j].length - 1].element.length === 1) {
        const newResult = [...results[j], create(word[i], realElements)];
        results[j][results[j].length - 1] = create(
          results[j][results[j].length - 1].element + word[i],
          realElements
        );
        results.push(newResult);
      } else {
        results[j].push(create(word[i], realElements));
      }
    }
  }
  return realResults(results);
}

function realResults(results) {
  return results.map((r) => {
    return { elements: r, real: r.reduce((acc, e) => acc && e.real, true) };
  });
}

function create(newElement, realElements) {
  return {
    element: newElement,
    real: realElements.find((ele) => ele.symbol.toLowerCase() === newElement)
      ? true
      : false,
  };
}

onmessage = function (e) {
  postMessage(algorithm(e.data[0], e.data[1]));
};
