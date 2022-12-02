const fs = require('fs');
const input = fs.readFileSync('input/02.txt', 'utf8');
const inputAsArray = input.split(/\n/);

let sum = 0;

function addToSum( sum, player){
    // rock
    if( player === 'X'){
        return sum + 1;
    }

    // paper
    if( player === 'Y'){
        return sum + 2;
    }

    // scissors
    //if( player === 'Z'){
        return sum + 3
    //}
}

for (let i = 0; i < inputAsArray.length; i++){

    const roundValues = inputAsArray[i].split(' ');

    // add playing "weapon" round score
    sum = addToSum(sum, roundValues[1]);

    // A X // rock
    // B Y // paper
    // C Z // scissors

    // winnings
    const win = ['C X', 'B Z', 'A Z'];
    const tie = ['A X', 'B Y', 'C Z'];
    //const lose = ['B X', 'C Y', 'A Z']; // not necessary but left for clarification

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