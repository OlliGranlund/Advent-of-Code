const fs = require('fs');
const input = fs.readFileSync('input/12_test.txt', 'utf8');

let matrix = input.split(/\n/);

for (let i = 0; i < matrix.length; i++) {
    matrix[i] = matrix[i].split('');
}

let startPoint = null;
let goal = null;
let heightMap = JSON.parse(JSON.stringify(matrix));

for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < matrix[row].length; column++) {
        const currentValue = matrix[row][column];
        if( currentValue.toUpperCase() === currentValue ){
            // Handle start/end

            if( currentValue === 'S' ){
                startPoint = [row, column];
            }

            if( currentValue === 'E' ){
                goal = [row, column];
            }

        } else {
            // handle everything else

            const heightValue = currentValue.charCodeAt(0) - 97;
            // console.log( heightValue );

            heightMap[row][column] = heightValue;
        }
    }
}

console.log( heightMap );

console.log('1201: ' );