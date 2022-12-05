const fs = require('fs');
const input = fs.readFileSync('input/05.txt', 'utf8');
const inputAsArray = input.split(/\n/);

let arrays = [];

// Setup arrays
/*
const startOrder = [
    'NZ',
    'DCM',
    'P',
];
*/

const startOrder = [
    'GPNR',
    'HVSCLBJT',
    'LNMBDT',
    'BSPVR',
    'HVMWSQCG',
    'JBDCSQW',
    'LQF',
    'VFLDTHMW',
    'FJMVBPL',
];

for (let i = 0; i < startOrder.length; i++){
    const rowValues = startOrder[i].replace(/(\r\n|\n|\r)/gm, "").split('');
    arrays.push( rowValues );
}

// Handle moves
for (let i = 0; i < inputAsArray.length; i++){
    const rowValue = inputAsArray[i].replace(/(\r\n|\n|\r)/gm, "");
    const simplifiedValues = rowValue.replace('move ', '').replace(' from ', '-').replace(' to ', '-').split('-');
    const move  = parseInt( simplifiedValues[0] );
    const from  = parseInt( simplifiedValues[1] );
    const to    = parseInt( simplifiedValues[2] );

    for (let i = 0; i < move; i++){
        const movable = arrays[from - 1][0];
        arrays[from - 1] = arrays[from - 1].slice(1);
        arrays[to - 1].unshift(movable);
    }
}

const message = arrays.reduce(
    (accumulator, currentValue) => accumulator + currentValue[0],
    ""
);

console.log('0501: ' + message );