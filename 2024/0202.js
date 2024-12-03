const fs = require('fs');
const input = fs.readFileSync('input/02.txt', 'utf8');
const inputAsArray = input.split(/\n/);

let total = 0;
const maxThreshold = 3;

const validateLine = (values) => {
  // duplicate check
  if( new Set(values).size !== values.length ){
    return false;
  }

  // sort check
  if( 
    [...values].toString() !== [...values].sort((a, b) => a - b).toString() &&
    [...values].toString() !== [...values].sort((a, b) => b - a).toString()
  ){
    return false;
  }

  // value comparision
  const comparisionCheck = values.every((value, i) => {

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

  return comparisionCheck;
};

const explodeArrayToArrays = (line) => {
  const values = line.split(' ').map((val) => parseInt(val));
  let explodedArrays = [];

  for(let i = 0; i < values.length; i++){
    const iterationArray = [...values];
    iterationArray.splice(i, 1);
    explodedArrays.push(iterationArray);
  }

  return explodedArrays;
};

inputAsArray.forEach((line) => {
  const values = line.split(' ').map((val) => parseInt(val));
  let lineStatus = validateLine(values);

  if( !lineStatus ){
    const explodedValues = explodeArrayToArrays(line).some((explodedLine) => {
      return validateLine(explodedLine);
    });

    if( !explodedValues ){
      return;
    }
  }

  total += 1;
});


console.log(`0202: ${total}`);