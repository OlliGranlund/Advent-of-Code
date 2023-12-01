const fs = require('fs');
const input = fs.readFileSync('input/01.txt', 'utf8');
const inputAsArray = input.split(/\n/);

let total = 0;

for (let i = 0; i < inputAsArray.length; i++){

  let sum = 0;

  let firstDigit = null;
  let lastDigit = 0;

  inputAsArray[i] = inputAsArray[i]
    .replace(/one/g, 'one1one')
    .replace(/two/g, 'two2two')
    .replace(/three/g, 'three3three')
    .replace(/four/g, 'four4four')
    .replace(/five/g, 'five5five')
    .replace(/six/g, 'six6six')
    .replace(/seven/g, 'seven7seven')
    .replace(/eight/g, 'eight8eight')
    .replace(/nine/g, 'nine9nine');

  inputAsArray[i] = inputAsArray[i].replace(/\D/g,'');

  firstDigit = inputAsArray[i][0];
  lastDigit = inputAsArray[i].split("").reverse().join("")[0];

  sum = parseInt(firstDigit + lastDigit);

  total = total + sum;
}

console.log( '0102: ' + total );