const fs = require('fs');
const txt = fs.readFileSync('input/09_test.txt', 'utf8');
const input = txt.split(/\n/);

const start = 0;
let snake = Array(10).fill([0,0]);
let snakeMemory = Array(10).fill([0,0]);
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

    for (let m = 0; m < steps; m++) {

        // each snake movement
        for (let s = 0; s < snake.length; s++) {

            if( s === 0){
                // move head
                snakeMemory[s] = JSON.parse(JSON.stringify([...snake[s]]))
                snake[s] = move(snake[s], direction, 1);
            } else {
                // check if body/tail moves
                const prevPos = snake[s - 1];
                const currentPos = snake[s];

                diffArray = prevPos.map((a, b) => a - currentPos[b]);

                // set body/tail position
                if( Math.abs( diffArray[0] ) > 1 || Math.abs( diffArray[1] ) > 1 ){

                    if( Math.abs( diffArray[0] ) > 1 ){
                        // fix x
                        const newY = prevPos[1];
                        snake[s] = [snake[s][0] + Math.sign(diffArray[0]) , newY];

                    } else if( Math.abs( diffArray[1] ) > 1 ){
                        // fix y
                        const newX = prevPos[0];
                        snake[s] = [newX, snake[s][1] + Math.sign(diffArray[1])];

                    }

                    if( s === snake.length - 1 ){
                        // add tail position
                        tailPositionsInOrder.push( JSON.parse(JSON.stringify([...snake[s]])) );
                    }
                }
            }

        }
    }
}

console.log( tailPositionsInOrder );

const tailPositions = tailPositionsInOrder.filter(( t={}, a=> !(t[a]=a in t) ));

console.log( tailPositions );

// not 3491
// not 2626

console.log('0902: ' + (tailPositions.length) );