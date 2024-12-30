const fs = require('fs');
const input = fs.readFileSync('input/09.txt', 'utf8');
const lines = input.split(/\n/);
const inputData = lines[0];

let buffer = [];

const calculateChecksum = (bufferArray) => {
  let checksum = 0;

  let builtString = '';

  bufferArray.forEach((item, i) => {
    builtString += item.id.toString().repeat(item.size);
    builtString += '0'.repeat(item.space);
  });

  let index = 0;
  bufferArray.forEach((single, i) => {
    for(let j = 0; j < single.size; j++){
      checksum += index * single.id;
      index++;
    }

    if( single.space ){
      for(let j = 0; j < single.space; j++){
        index++
      }
    }
  });

  return checksum;
};

// Handle dense format (array starts at 0)
// odd = space
// even = file
inputData.split('').forEach((value, i) => {  
  const fileID = Math.floor(i/2);
  const space = inputData[i + 1] ? parseInt(inputData[i + 1]) : 0

  if( i % 2 === 0){
    // Handling value
    buffer.push({id: fileID, size: parseInt(value), space})
  }
});

const largestID = buffer[buffer.length - 1].id;

for (let i = largestID; i >= 0; i--) {
  let potentialSpaceIndex = null;
  let potentialFileIndex = null;

  potentialFileIndex = buffer.findIndex((file) => file.id === i);

  if( potentialFileIndex === -1 ){
    potentialFileIndex = null;
  }

  // space location
  if(potentialFileIndex){
    for (let i = 0; i < buffer.length; i++) {
      if( buffer[i].space >= buffer[potentialFileIndex].size && i < potentialFileIndex){
        potentialSpaceIndex = i;
        break;
      }
    }
  }

  if( potentialFileIndex === null ){
    continue; 
  }

  if( potentialSpaceIndex === null && potentialFileIndex !== null ){
    continue; // next itr
  }

  // prep remove file
  const id = buffer[potentialFileIndex].id;
  const size = buffer[potentialFileIndex].size;

  const donateableSpace = size + buffer[potentialFileIndex].space;

  // add any space to the left, take into account of this is target space element
  buffer[potentialFileIndex - 1].space += donateableSpace;

  // remove file
  buffer.splice(potentialFileIndex, 1);

  // add file
  buffer.splice(potentialSpaceIndex + 1, 0, {id, size, space: 0});

  // udpate space(s)
  const spaceElementSpace = buffer[potentialSpaceIndex].space;
  buffer[potentialSpaceIndex].space = 0;
  buffer[potentialSpaceIndex + 1].space = spaceElementSpace - size;
}

console.log(`0902: ${calculateChecksum(buffer)}`);