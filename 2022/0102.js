const fs = require('fs');
const input = fs.readFileSync('input/01.txt', 'utf8');
const inputAsArray = input.split(/\n/);

let results = [];
let targetIndex = 0;

for (let i = 0; i < inputAsArray.length; i++){

  if( inputAsArray[i] === "" ){
    targetIndex++;
    results[targetIndex] = 0;
  } else {
    if( results.length === 0 ){
      results[targetIndex] = parseInt( inputAsArray[i] );
    } else {
      results[targetIndex] = parseInt(results[targetIndex]) + parseInt(inputAsArray[i]);
    }
  }
}

// console.log( '0101: ' + Math.max( ...results ) );

let sorted = results.sort().reverse();

console.log( '0102: ' + ( sorted[0] + sorted[1] + sorted[2]) );