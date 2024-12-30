const fs = require('fs');
const input = fs.readFileSync('input/09.txt', 'utf8');
//const input = fs.readFileSync('input/09test.txt', 'utf8');
const lines = input.split(/\n/);
const inputData = lines[0];

let buffer = [];

const calculateChecksum = (bufferArray) => {
  let checksum = 0;

  bufferArray.forEach((value, i) => {
    if( value === '.' ){
      return;
    }
    checksum += value * i;
  });

  return checksum;
};

// Handle dense format (array starts at 0)
// odd = space
// even = file
inputData.split('').forEach((value, i) => {  
  const fileID = Math.floor(i/2);

  if( i % 2 === 0){
    // Handling value
    for(let j = 0; j < value; j++){
      buffer.push(fileID)
    }
  } else {
    for(let j = 0; j < value; j++){
      buffer.push(null)
    }
  }
});

const spaceCount =  buffer.filter((single) => single === null).length;

for(let i = 0; i < spaceCount; i++){
  // find first element index in array where value is 0
  const spaceIndex = buffer.findIndex((single) => single === null);

  if( spaceIndex < 0 ){
    break;
  }
  // find last element in array where value is not 0
  let transferableValue = null;
  for(let i = 0; i < spaceCount; i++){
    transferableValue = buffer.pop();
    if( transferableValue !== 0){
      break;
    }
  }

  buffer[spaceIndex] = transferableValue;
}

console.log(`0901: ${calculateChecksum(buffer)}`);

// 6288707484810 right