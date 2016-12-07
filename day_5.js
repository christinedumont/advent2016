var md5 = require('md5');
var utils = require('./utils/utils.js');

solveP1('ojvtpuvg');
solveP2('ojvtpuvg');

function solveP1(puzzleInput) {
  var index = 0, pass = '';
  while (pass.length < 8) {
    var hash = md5(puzzleInput + index);
    if (hash.startsWith('00000')) pass += hash.charAt(5);
    index ++;
  }
  console.log('Final result for P1:\n'+pass);
};

function solveP2(puzzleInput) {
  var index = 0;
  var pass = new Array(8);
  while (!utils.isArrayFull(pass)) {
    var hash = md5(puzzleInput + index);
    if (hash.startsWith('00000')) {
      var pos = parseInt(hash.charAt(5));
      var value = hash.charAt(6);
      if ((pos != NaN && pos >= 0 && pos < 8) && pass[pos]==undefined) {
          pass[pos] = value;
          utils.printArrayPretty(pass);
      }
    }
    index ++;
  }
  console.log('Final result for P2:');
  utils.printArrayPretty(pass);
};
