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

onmessage = function (e) {
  postMessage(algorithm(e.data));
};
