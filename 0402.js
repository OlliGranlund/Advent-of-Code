const fs = require('fs');
const input = fs.readFileSync('input/04.txt', 'utf8');
const inputAsArray = input.split(/\n/);

let pairs = 0;

for (let i = 0; i < inputAsArray.length; i++){
    const rowValues = inputAsArray[i].replace(/(\r\n|\n|\r)/gm, "").split(',');
    
    const leftValues = rowValues[0].split('-');
    const leftStart = parseInt( leftValues[0] );
    const leftEnd = parseInt( leftValues[1] );
    const rightValues = rowValues[1].split('-');
    const rightStart = parseInt( rightValues[0] );
    const rightEnd = parseInt( rightValues[1] );

    if( 
        leftStart >= rightStart && leftEnd <= rightEnd ||
        rightStart >= leftStart && rightEnd <= leftEnd ||
        leftStart <= rightStart && leftEnd >= rightStart ||
        leftStart <= rightEnd && leftEnd >= rightStart ||
        rightStart <= leftStart && rightEnd >= leftStart ||
        rightStart <= leftEnd && rightEnd >= leftStart 
    ){
        pairs++;
    }
}

console.log('0401: ' + pairs);