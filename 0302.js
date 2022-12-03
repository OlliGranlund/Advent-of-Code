const fs = require('fs');
const input = fs.readFileSync('input/03.txt', 'utf8');
const inputAsArray = input.split(/\n/);

let arrays = [];
let sum = 0;

function recursiveIntersectArrays( left, arrays ){
    let commonValues = null
    let right = null;

    if( left === null ){
        // get two first
        left = arrays[0].split('');
        right = arrays[1].split('');
        arrays = arrays.slice(2);
    } else {
        // Get one at a time
        right = arrays[0].split('');
        arrays = arrays.slice(1);
    }

    commonValues = [...new Set(left.filter(value => right.includes(value)))];

    if( arrays.length ){
        commonValues = recursiveIntersectArrays( commonValues, arrays );
    }

    return commonValues[0];
};

for (let i = 0; i < inputAsArray.length; i++){

    let intersection = null;
    arrays.push(  inputAsArray[i].replace(/(\r\n|\n|\r)/gm, "") );

    if( (i + 1) % 3 === 0 ){
        // get intersecting
        intersection = recursiveIntersectArrays( null, arrays );
        arrays = [];
    }

    if( intersection !== null){
        if ( intersection.toUpperCase() === intersection ) {
            // Capital letters value correction
            sum = sum + intersection.charCodeAt(0) - 38;
        } else {
            // Non-capital letter value correction
            sum = sum + intersection.charCodeAt(0) - 96;
        }
        intersection = null;
    }
}

console.log('0302: ' + sum);