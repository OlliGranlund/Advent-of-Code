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

function getNewRPValue( possibleValues, lp, rp ){
    for (let i = 0; i < possibleValues.length; i++){
        let loseMapping = possibleValues[i].split(' ');
        if( loseMapping[0] === lp ){
            return loseMapping[1];
        } 
    }

    // fallback, should never occur
    return rp;
}

for (let i = 0; i < inputAsArray.length; i++){

    const roundValues = inputAsArray[i].split(' ');
    const lp = roundValues[0];
    let rp = roundValues[1];

    // A X // rock
    // B Y // paper
    // C Z // scissors

    const win = ['C X', 'B Z', 'A Y'];
    const tie = ['A X', 'B Y', 'C Z'];
    const lose = ['B X', 'C Y', 'A Z'];

    if( rp === 'X' ){
        rp = getNewRPValue( lose, lp, rp );
    } else if( rp === 'Y' ){
        rp = getNewRPValue( tie, lp, rp );
    } else {
        rp = getNewRPValue( win, lp, rp );
    }

    // add playing "weapon" round score
    sum = addToSum(sum, rp);

    if( win.includes(lp + ' ' + rp) ){
        // you win the round
        sum = sum + 6;
    } else if( tie.includes(lp + ' ' + rp) ){
        // it's a tie
        sum = sum + 3;
    } else {
        // you lose the round
        //sum = sum + 0;
    }
}

console.log('0202: ' + sum);