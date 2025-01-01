const fs = require('fs');
const input = fs.readFileSync('input/06.txt', 'utf8');
const lines = input.split(/\n/);
const xaxis = lines[0].split('').length;
const yaxis = lines.length;

const map = [];
const visitedSpots = [];
const obstacles = [];
let guardStartPosition = {};
const directions = ['n', 'e', 's', 'w'];

// debug func to print map with obstacles and guard steps
const debug = ( debugMap = [], spots = [], potentialNewObstacles = [] ) => {
  // Visual debug
  let debugLines = '';

  for(let y = 0; y < yaxis; y++){
    for(let x = 0; x < xaxis; x++){

      let lineBuffer = '';
      const mapSpot = debugMap.find((coord) => coord.x === x && coord.y === y)

      lineBuffer = mapSpot.value;

      spots.forEach((spot) => {
        if( spot.x === x && spot.y === y ){
          lineBuffer = 'X';
        }
      });

      if( potentialNewObstacles.length ){
        potentialNewObstacles.forEach((newObstacle) => {
          if( newObstacle.x === x && newObstacle.y === y ){
            lineBuffer = 'O';
          }
        });
      }
      
      debugLines += lineBuffer;
    }
    
    // add new row to debugLines
    debugLines += '\n';
  }

  console.log(debugLines);
}

const addCoordinate = (x, y, value) => {
  // Handle as we move guard
  if( value === '^'){
    guardStartPosition = {x, y};
    value = '.';
  }

  if( value === '#' ){
    obstacles.push({x, y});
  }

  map.push({x, y, value})
};

const getCoordinate = (coordinateMap, x, y) => {
  const coordinate = coordinateMap.find((coord) => coord.x === x && coord.y === y);
  return coordinate ? coordinate : '';
};

// build map
lines.forEach((line, yi) => {
  const xvalues = line.split('');

  xvalues.forEach((value, xi) => {
    addCoordinate(xi, yi, value);
  });
});

const navigateGuard = (navigateMap, saveGlobalVisitedSpots = false) => {
  // guard starting position
  let guardPosition = { ...guardStartPosition };
  let itrVisitedSpots = [];
  let direction = 'n';

  if( saveGlobalVisitedSpots ){
    visitedSpots.push({x: guardPosition.x, y: guardPosition.y, direction});
  }
  let infiniteTrigger = false;

  // for each step
  while( true ){
    let valueFrontOfGuard = {};

    // find direction
    if( direction === 'n'){
      valueFrontOfGuard = getCoordinate(navigateMap, guardPosition.x, guardPosition.y - 1);
    } else if ( direction === 's'){
      valueFrontOfGuard = getCoordinate(navigateMap, guardPosition.x, guardPosition.y + 1);
    } else if ( direction === 'e'){
      valueFrontOfGuard = getCoordinate(navigateMap, guardPosition.x + 1, guardPosition.y);
    } else if ( direction === 'w'){
      valueFrontOfGuard = getCoordinate(navigateMap, guardPosition.x - 1, guardPosition.y);
    } else {
      console.log("error");
    }

    if( valueFrontOfGuard.value === '#' ){
      // turn right
      direction = directions[(directions.indexOf(direction) + 1) % 4];
      continue;
    }
    
    // Checking infinite loop
    const sameDirMatches = itrVisitedSpots.find((coord) => 
      coord.x === valueFrontOfGuard.x && 
      coord.y === valueFrontOfGuard.y && 
      coord.direction === direction
    );
    if( sameDirMatches ){
      infiniteTrigger = true;
      break;
    }

    // Taking a step
    if( valueFrontOfGuard && valueFrontOfGuard.x !== undefined && valueFrontOfGuard.y !== undefined ){
      guardPosition.x = valueFrontOfGuard.x;
      guardPosition.y = valueFrontOfGuard.y;
      
      if( saveGlobalVisitedSpots ){
        visitedSpots.push({x: guardPosition.x, y: guardPosition.y, direction});
      }

      itrVisitedSpots.push({x: guardPosition.x, y: guardPosition.y, direction});

      continue;
    }

    break;
  }

  if( infiniteTrigger ){
    return false;
  }

  return true;
};

// Run to populate visitedSpots
navigateGuard(map, true);

const potentialInfiniteObstacles = [];

visitedSpots.forEach((visitedSpot, i) => {
  console.log(`Checking ${i} of ${visitedSpots.length}`);

  const extraObstacleMap = map.map(coord => ({ ...coord }));

  const newObstacle = extraObstacleMap.find((coord) => coord.x === visitedSpot.x && coord.y === visitedSpot.y && coord.value === '.');

  newObstacle.value = '#';

  const infiniteLoop = navigateGuard(extraObstacleMap, false);

  if( !infiniteLoop ){
    potentialInfiniteObstacles.push({x: visitedSpot.x, y: visitedSpot.y});
  }
});

console.log(`0602: ${new Set(potentialInfiniteObstacles.map((spot) => JSON.stringify(spot))).size}`);