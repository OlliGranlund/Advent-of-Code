const fs = require('fs');
const input = fs.readFileSync('input/02.txt', 'utf8');
const inputAsArray = input.split(/\n/);

let total = 0;
const maxThreshold = 3;

inputAsArray.forEach((line) => {
  const values = line.split(' ').map((val) => parseInt(val));

  // duplicate check
  if( new Set(values).size !== values.length ){
    return;
  }

  // sort check
  if( 
    [...values].toString() !== [...values].sort((a, b) => a - b).toString() &&
    [...values].toString() !== [...values].sort((a, b) => b - a).toString()
  ){
    return
  }

  // value comparision
  const lineStatus = values.every((value, i) => {

    // check prev
    if( values[i-1] ){
      if( Math.abs( values[i] - values[i-1] ) > maxThreshold){
        return false;
      }
    }

    // check next && same
    if( values[i+1] ){
      if( Math.abs( values[i] - values[i+1] ) > maxThreshold ){
        return false;
      }
    }

    return true;
  });

  if( lineStatus ){
    total += 1;
  }
});


console.log(`0201: ${total}`);