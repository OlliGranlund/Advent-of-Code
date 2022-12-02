const fs = require('fs');
const input = fs.readFileSync('input/02.txt', 'utf8');
const inputAsArray = input.split(/\n/);

let sum = 0;

function addToSum( sum, player){
    // rock
    if( player === 'A'){
        return sum + 1;
    }

    // paper
    if( player === 'B'){
        return sum + 2;
    }

    // scissors
    //if( player === 'C'){
        return sum + 3
    //}
}

for (let i = 0; i < inputAsArray.length; i++){

    const roundValues = inputAsArray[i].split(' ');

    if( sum < 1000 ){
        console.log(sum);
    }

    // add playing "weapon" round score
    sum = addToSum(sum, roundValues[0]);

    // winnings
    const win = ['B Y', 'C X', 'A Z'];
    const tie = ['A Y', 'B X', 'C Z'];
    //const lose = ['A X', 'B Z', 'C Y']; // not necessary but left for clarification

    if( win.includes(inputAsArray[i]) ){
        // you win the round
        sum = sum + 6;
    } else if( tie.includes(inputAsArray[i]) ){
        // it's a tie
        sum = sum + 3;
    } else {
        // you lose the round
        //sum = sum + 0;
    }
}

console.log('0201: ' + sum);