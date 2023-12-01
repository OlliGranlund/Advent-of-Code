const fs = require('fs');
const input = fs.readFileSync('input/05.txt', 'utf8');

let startOrder = [];
let arrays = [];

// Transform data into workable format
const splitInput = input.split(/[\r\n]{2,}/);
const startPoint = splitInput[0];
const tasks = splitInput[1];

const splitStartPoint = startPoint.split(/\n/).reverse();
const startPointKeys = splitStartPoint[0];
const startPointValues = splitStartPoint.slice(1);
const splitStartPointKeys = startPointKeys.split('');

// Start to iterate by mapping character index per row basis
for (let i = 0; i < splitStartPointKeys.length; i++){
    if( splitStartPointKeys[i] !== ' ' ){
        const arrayKey = parseInt( splitStartPointKeys[i] ) - 1;

        for (let v = 0; v < startPointValues.length; v++){
            const splitStartPointValues = startPointValues[v].split('');
            if( /[a-z]/i.test(splitStartPointValues[i]) ){
                const previousValue = startOrder[arrayKey] ? startOrder[arrayKey] : '';
                startOrder[arrayKey] = splitStartPointValues[i] + previousValue;
            }
        }
    }
}

// Turn strings to arrays
for (let i = 0; i < startOrder.length; i++){
    const rowValues = startOrder[i].replace(/(\r\n|\n|\r)/gm, "").split('');
    arrays.push( rowValues );
}

// Prepare tasks
const tasksAsArray = tasks.split(/\n/);

// Handle moves
for (let i = 0; i < tasksAsArray.length; i++){
    const rowValue = tasksAsArray[i].replace(/(\r\n|\n|\r)/gm, "");
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
