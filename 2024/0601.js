const fs = require('fs');
const input = fs.readFileSync('input/06.txt', 'utf8');
const lines = input.split(/\n/);

const map = [];
const visitedSpots = [];
let direction = 'n';
const directions = ['n', 'e', 's', 'w'];

const addCoordinate = (x, y, value) => {
  map.push({x, y, value})

  // Handle as we move guard
  if( value === '^'){
    map.push({x, y, value: '.'});
  }
};

const getCoordinate = (x, y) => {
  const coordinate = map.find((coord) => coord.x === x && coord.y === y);
  return coordinate ? coordinate : '';
};

// build map
lines.forEach((line, yi) => {
  const xvalues = line.split('');

  xvalues.forEach((value, xi) => {
    addCoordinate(xi, yi, value);
  });
});

// guard starting position
let guardPosition = map.find((coord) => coord.value === '^');
visitedSpots.push({x: guardPosition.x, y: guardPosition.y});

// for each step
while( true ){
  // find starting point
  guardPosition = map.find((coord) => coord.value === '^');
  let valueFrontOfGuard = {};

  // find direction
  if( direction === 'n'){
    valueFrontOfGuard = getCoordinate(guardPosition.x, guardPosition.y - 1);
  } else if ( direction === 's'){
    valueFrontOfGuard = getCoordinate(guardPosition.x, guardPosition.y + 1);
  } else if ( direction === 'e'){
    valueFrontOfGuard = getCoordinate(guardPosition.x + 1, guardPosition.y);
  } else if ( direction === 'w'){
    valueFrontOfGuard = getCoordinate(guardPosition.x - 1, guardPosition.y);
  } else {
    console.log("error");
  }

  if( valueFrontOfGuard.value === '#' ){
    // turn right
    direction = directions[(directions.indexOf(direction) + 1) % 4];
    continue;
  }

  // Taking a step
  if( valueFrontOfGuard && valueFrontOfGuard.x !== undefined && valueFrontOfGuard.y !== undefined ){
    guardPosition.x = valueFrontOfGuard.x;
    guardPosition.y = valueFrontOfGuard.y;
    visitedSpots.push({x: guardPosition.x, y: guardPosition.y});
    continue;
  }

  break;
}

// Visual debug
const xaxis = lines[0].split('').length;
const yaxis = lines.length;
let debugLines = '';

for(let y = 0; y < yaxis; y++){
  for(let x = 0; x < xaxis; x++){

    const current = map.find((coord) => coord.x === x && coord.y === y)
    let lineBuffer = '';

    if( current.value === '^' ){
      lineBuffer = '.';
    };

    // find default val
    lineBuffer = map.find((coord) => coord.x === x && coord.y === y).value;

    // find visited positions
    if( visitedSpots.find((coord) => coord.x === x && coord.y === y) ){
      lineBuffer = 'X';
    }

    debugLines += lineBuffer;
  }
  
  // add new row to debugLines
  debugLines += '\n';
}

console.log( debugLines );
console.log(`0601: ${new Set(visitedSpots.map((spot) => JSON.stringify(spot))).size}`);

// 5551 right