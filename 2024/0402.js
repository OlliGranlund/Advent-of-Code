const fs = require('fs');
const input = fs.readFileSync('input/04.txt', 'utf8');
const yValues = input.split(/\n/);

const targetLetter = 'A';
const startEndLetter = ['S', 'M'];
let total = 0;
const map = [];

const addCoordinate = (x, y, value) => {
  map.push({x, y, value})
};

const getCoordinateValue = (x, y) => {
  const coordinate = map.find((coord) => coord.x === x && coord.y === y);
  return coordinate ? coordinate.value : '';
};

const directions = [
  { dx: 1, dy: 1 },    // Diagonal down-right
  { dx: -1, dy: -1 },  // Diagonal up-left
  { dx: -1, dy: 1 },   // Diagonal down-left
  { dx: 1, dy: -1 }    // Diagonal up-right
];

const checkWord = (x, y) => {
  let directionMatches = 0;

  // check towards all directions
  for (const { dx, dy } of directions) {
    let singleMatch = true;

    const valuePos = getCoordinateValue(x + dx, y + dy);
    const valueNeg = getCoordinateValue(x - dx, y - dy);

    if( 
      !startEndLetter.includes(valuePos) || 
      !startEndLetter.includes(valueNeg) || 
      valuePos === valueNeg
    ){
      singleMatch = false;
      break;
    }

    if( singleMatch ){
      directionMatches += 1;
    }
  }

  if( directionMatches === 4 ){
    return 1;
  }

  return 0;
}

// build map
yValues.forEach((line, yi) => {
  const xvalues = line.split('');

  xvalues.forEach((value, xi) => {
    addCoordinate(xi, yi, value);
  });
});

map.forEach((coord) => {

  if( coord.value !== targetLetter ){
    return;
  }

  total += checkWord(coord.x, coord.y);
});


console.log(`0402: ${total}`);