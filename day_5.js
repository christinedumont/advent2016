var md5 = require('md5');

var puzzleInput = 'ojvtpuvg', index = 0, pass = '';
while (pass.length < 8) {
  var hash = md5(puzzleInput + index);
  if (hash.startsWith('00000')) pass += hash.charAt(5);
  index ++;
}
console.log('Pass is: '+pass);
