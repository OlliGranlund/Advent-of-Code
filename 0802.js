const fs = require('fs');
const input = fs.readFileSync('input/08.txt', 'utf8');

let matrix = input.split(/\n/);
let maxValue = 0;

for (let i = 0; i < matrix.length; i++) {
    matrix[i] = matrix[i].split('');
}

let scenicMatrix = JSON.parse(JSON.stringify(matrix));

const rowsCount = matrix.length - 1;
const colsCount = matrix[0].length - 1;

for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < matrix[row].length; column++) {
        const currentValue = parseInt( matrix[row][column] );
        let comparables = [];
        let scenicScore = [];

        // top
        const topCountable = row;

        // left
        const leftCountable = column;

        // right
        const rightCountable = colsCount - leftCountable;

        // bottom
        const bottomCountable = rowsCount - topCountable;

        if( topCountable > 0 ){
            comparables = [];

            for (let i = 0; i < topCountable; i++) {
                comparables.push( parseInt( matrix[i][column] ) );
            }

            comparables = comparables.reverse();

            let scenicTop = 0;
            for (let i = 0; i < comparables.length; i++) {
                if( currentValue > comparables[i] ){
                    scenicTop++;
                } else if( currentValue === comparables[i] ){
                    scenicTop++;
                    break;
                } else {
                    scenicTop++;
                    break;
                }
            }

            scenicScore.push( scenicTop );

        } else {
            scenicScore.push(0);
        }

        if( leftCountable > 0 ){
            comparables = [];

            for (let i = 0; i < leftCountable; i++) {
                comparables.push( parseInt( matrix[row][i] ) );
            }
            
            comparables = comparables.reverse();

            let scenicLeft = 0;
            for (let i = 0; i < comparables.length; i++) {
                if( currentValue > comparables[i] ){
                    scenicLeft++;
                } else if( currentValue === comparables[i] ){
                    scenicLeft++;
                    break;
                } else {
                    scenicLeft++;
                    break;
                }
            }

            scenicScore.push( scenicLeft );
        } else {
            scenicScore.push(0);
        }

        if( bottomCountable > 0 ){
            comparables = [];

            for (let i = row + 1; i <= row + bottomCountable; i++) {
                comparables.push( parseInt( matrix[i][column] ) );
            }

            let scenicBot = 0;

            for (let i = 0; i < comparables.length; i++) {
                if( currentValue > comparables[i] ){
                    scenicBot++;
                } else if( currentValue === comparables[i] ){
                    scenicBot++;
                    break;
                } else {
                    scenicBot++;
                    break;
                }
            }

            scenicScore.push( scenicBot );

        } else {
            scenicScore.push(0);
        }

        if( rightCountable > 0 ){
            comparables = [];

            for (let i = column + 1; i <= column + rightCountable; i++) {
                comparables.push( parseInt( matrix[row][i] ) );
            }
            
            let scenicRight = 0;
            
            for (let i = 0; i < comparables.length; i++) {

                if( currentValue > comparables[i] ){
                    scenicRight++;
                } else if( currentValue === comparables[i] ){
                    scenicRight++;
                    break;
                } else {
                    scenicRight++;
                    break;
                }
            }

            scenicScore.push( scenicRight );

        } else {
            scenicScore.push(0);
        }

        scenicMatrix[row][column] = scenicScore.reduce((acc, curr) => acc * curr);

    }
}

maxValue = Math.max( ...scenicMatrix.flat() );

console.log('0802: ' + maxValue );