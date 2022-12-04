const fs = require('fs');
const input = fs.readFileSync('input/04.txt', 'utf8');
const inputAsArray = input.split(/\n/);

let pairs = 0;

function buildString (input){
    const splitInput = input.split('-');
    const start = parseInt( splitInput[0] );
    const end = parseInt( splitInput[1] );
    let result = '';

    for (let i = start; i <= end; i++){

        if( result !== '' ){
            result = result + "-";
        }

        result = result + i;
    }

    // Required pre- and post values to handle edge-cases
    return '-' + result + '-';
}

for (let i = 0; i < inputAsArray.length; i++){
    const rowValues = inputAsArray[i].replace(/(\r\n|\n|\r)/gm, "").split(',');

    // Alternative solution with string based comparision
    /*
    let left = buildString( rowValues[0] );
    let right = buildString( rowValues[1] );


    if( left.includes(right) || right.includes(left) ){
        pairs++;
    }
    */
    
    const leftValues = rowValues[0].split('-');
    const leftStart = parseInt( leftValues[0] );
    const leftEnd = parseInt( leftValues[1] );
    const rightValues = rowValues[1].split('-');
    const rightStart = parseInt( rightValues[0] );
    const rightEnd = parseInt( rightValues[1] );

    if( 
        leftStart >= rightStart && leftEnd <= rightEnd ||
        rightStart >= leftStart && rightEnd <= leftEnd    
    ){
        pairs++;
    }
}

console.log('0401: ' + pairs);