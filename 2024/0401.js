const fs = require('fs');
const input = fs.readFileSync('input/04.txt', 'utf8');
const yValues = input.split(/\n/);

let total = 0;
const map = [];
const word = 'XMAS';

const addCoordinate = (x, y, value) => {
  map.push({x, y, value})
};

const getCoordinateValue = (x, y) => {
  const coordinate = map.find((coord) => coord.x === x && coord.y === y);
  return coordinate ? coordinate.value : '';
};

const directions = [
  { dx: 1, dy: 0 },    // Horizontal right
  { dx: -1, dy: 0 },   // Horizontal left
  { dx: 0, dy: -1 },   // Vertical up
  { dx: 0, dy: 1 },    // Vertical down
  { dx: 1, dy: 1 },    // Diagonal down-right
  { dx: -1, dy: -1 },  // Diagonal up-left
  { dx: -1, dy: 1 },   // Diagonal down-left
  { dx: 1, dy: -1 }    // Diagonal up-right
];

const checkWord = (x, y) => {
  let wordMatches = 0;

  // check towards all directions
  for (const { dx, dy } of directions) {
    let singleMatch = true;

    // check each letter
    for(let i = 0; i < word.length; i++){
      const value = getCoordinateValue(x + (dx * i), y + (dy * i));
      if(value !== word[i]){
        singleMatch = false;
        break;
      }
    }

    if( singleMatch ){
      wordMatches += 1;
    }
  }

  return wordMatches;
}

// build map
yValues.forEach((line, yi) => {
  const xvalues = line.split('');

  xvalues.forEach((value, xi) => {
    addCoordinate(xi, yi, value);
  });
});

map.forEach((coord) => {

  if( coord.value !== word[0] ){
    return;
  }

  total += checkWord(coord.x, coord.y, word);
});


console.log(`0401: ${total}`);