const fs = require('fs');
const input = fs.readFileSync('input/03.txt', 'utf8');
const inputAsArray = input.split(/\n/);

let sum = 0;

for (let i = 0; i < inputAsArray.length; i++){

    const stringLength = inputAsArray[i].length;
    const left = inputAsArray[i].slice(0, stringLength / 2).split('');
    const right = inputAsArray[i].slice( stringLength / 2, -1).split('');
    const commonValue = [...new Set(left.filter(value => right.includes(value)))][0];

    if ( commonValue.toUpperCase() === commonValue ) {
        // Capital letters value correction
        sum = sum + commonValue.charCodeAt(0) - 38;
    } else {
        // Non-capital letter value correction
        sum = sum + commonValue.charCodeAt(0) - 96;
    }

}

console.log('0301: ' + sum);