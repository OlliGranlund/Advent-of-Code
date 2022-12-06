const fs = require('fs');
const input = fs.readFileSync('input/06.txt', 'utf8');

const keySize = 4;
const data = input.split('');
let result = 0;

// Handle moves
for (let i = 0; i < data.length; i++){
    if( i < keySize ){
        continue;
    }

    comparisionArray = [data[i]];
    for (let r = 1; r < keySize; r++){
        comparisionArray.push( data[i - r] );
    }

    if( [...new Set(comparisionArray)].length === keySize ){
        result = i + 1;
        break;
    }
}

console.log('0601: ' + result );