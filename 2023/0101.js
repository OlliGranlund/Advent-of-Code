const fs = require('fs');
const input = fs.readFileSync('input/01.txt', 'utf8');
const inputAsArray = input.split(/\n/);

let total = 0;

for (let i = 0; i < inputAsArray.length; i++){

  let sum = 0;

  let firstDigit = null;
  let lastDigit = 0;

  inputAsArray[i].split('').forEach( (digit) => {

    if( firstDigit === null && !isNaN( parseInt(digit)) ){
      firstDigit = digit;
    }

    if( !isNaN( parseInt(digit)) ){
      lastDigit = digit;
    }
  });

  sum = parseInt(firstDigit + lastDigit);

  total = total + sum;
}

console.log( '0101: ' + total );