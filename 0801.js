const fs = require('fs');
const input = fs.readFileSync('input/08.txt', 'utf8');

let matrix = input.split(/\n/);
let visibleTrees = 0;

for (var i = 0; i < matrix.length; i++) {
    matrix[i] = matrix[i].split('');
}

console.log( matrix );

const rowsCount = matrix.length - 1;
const colsCount = matrix[0].length - 1;

for (var row = 0; row < matrix.length; row++) {
    for (var column = 0; column < matrix[row].length; column++) {
        const currentValue = parseInt( matrix[row][column] );
        let comparables = [];
        let currenTreeVisible = false;

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
            
            if( !comparables.some((element) => element >= currentValue) ){
                currenTreeVisible = true;
            }
        } else {
            currenTreeVisible = true;
        }

        if( !currenTreeVisible ){
            if( bottomCountable > 0 ){
                comparables = [];

                for (let i = row + 1; i <= row + bottomCountable; i++) {
                    // console.log({i, column, row, bottomCountable});
                    comparables.push( parseInt( matrix[i][column] ) );
                }
                
                if( !comparables.some((element) => element >= currentValue) ){
                    currenTreeVisible = true;
                }

            } else {
                currenTreeVisible = true;
            }
        }

        if( !currenTreeVisible ){
            if( leftCountable > 0 ){
                comparables = [];

                for (let i = 0; i < leftCountable; i++) {
                    comparables.push( parseInt( matrix[row][i] ) );
                }
                
                if( !comparables.some((element) => element >= currentValue) ){
                    currenTreeVisible = true;
                }
            } else {
                currenTreeVisible = true;
            }
        }


        if( !currenTreeVisible ){
            if( rightCountable > 0 ){
                comparables = [];

                for (let i = column + 1; i <= column + rightCountable; i++) {
                    comparables.push( parseInt( matrix[row][i] ) );
                }
                
                if( !comparables.some((element) => element >= currentValue) ){
                    currenTreeVisible = true;
                }
            } else {
                currenTreeVisible = true;
            }
        }

        if( currenTreeVisible ){
            visibleTrees = visibleTrees + 1;
        }
    }
}

console.log('0801: ' + visibleTrees );