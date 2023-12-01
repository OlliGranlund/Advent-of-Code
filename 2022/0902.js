const fs = require('fs');
const txt = fs.readFileSync('input/09.txt', 'utf8');
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

// for debug
function paintSnake( snake ){
    for (let col = 5; col >= 0; col--) {
        let rowData = '';

        for (let row = 0; row <= 5; row++) {

            let match = '.';
            snake.forEach( (single, index) => {
                if( single[0] === row && single[1] === col ){
                    match = index;
                }
            });

            rowData = rowData + match;
        }   

        console.log( rowData );
    }
    console.log("");
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
                if( Math.abs( diffArray[0] ) > 1 && Math.abs( diffArray[1] ) > 1 ){
                    // handle double jump
                    snake[s] = [snake[s][0] + Math.sign(diffArray[0]) , snake[s][1] + Math.sign(diffArray[1])];

                } else if( Math.abs( diffArray[0] ) > 1 ){
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

            // paintSnake( snake );

        }
    }
}

const tailPositions = tailPositionsInOrder.filter(( t={}, a=> !(t[a]=a in t) ));

console.log('0902: ' + (tailPositions.length) );