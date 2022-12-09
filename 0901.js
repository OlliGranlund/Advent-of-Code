const fs = require('fs');
const txt = fs.readFileSync('input/09.txt', 'utf8');
const input = txt.split(/\n/);

const start = 0;
let lastHead = [0,0]; // x,y
let head = [0,0];
let tail = [0,0];
let tailPositionsInOrder = [[0,0]];

function move( input, direction, steps ){
    if( direction === 'U' ){
        return [input[0], input[1] + steps];
    }

    if( direction === 'D' ){
        return [input[0], input[1] - steps];
    }

    if( direction === 'L' ){
        return [input[0] - steps,input[1]];
    }

    if( direction === 'R' ){
        return [input[0] + steps,input[1]];
    }

    return null;
}

for (let i = 0; i < input.length; i++) {

    let current = input[i].split(' ');
    const direction = current[0];
    const steps = current[1];

    for (let s = 0; s < steps; s++) {
        // move head
        lastHead = JSON.parse(JSON.stringify(head));
        head = move(head, direction, 1);

        // check if tail moves
        diffArray = head.map((a, b) => a - tail[b]);

        // set tail position
        if( Math.abs( diffArray[0] ) > 1 || Math.abs( diffArray[1] ) > 1 ){
            tail = JSON.parse(JSON.stringify([...lastHead]));

            // add tail position
            tailPositionsInOrder.push( JSON.parse(JSON.stringify([...tail])) );
        }
    }
}

const tailPositions = tailPositionsInOrder.filter(( t={}, a=> !(t[a]=a in t) ));

console.log('0901: ' + (tailPositions.length) );