const fs = require('fs');
const input = fs.readFileSync('input/12.txt', 'utf8');
const lines = input.split(/\n/);

const mapWidth = lines[0].length;
const mapHeight = lines.length;

const directions = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 }
  ];
  
  
const buildMap = () => {
    const buildMap = [];
    lines.forEach((line) => {
        buildMap.push(line.split(''));
    });

    return buildMap;
};

const origMap = buildMap();

const bfs = (start, map, visited) => {
    const queue = [start];
    const section = [];
    const startValue = map[start.y][start.x];
  
    while (queue.length > 0) {
      const { x, y } = queue.shift();
      const key = `${x},${y}`;
  
      if (visited.has(key)) {
        continue;
      }
  
      visited.add(key);
      section.push({ x, y });
  
      for (const { dx, dy } of directions) {
        const newX = x + dx;
        const newY = y + dy;
        const newKey = `${newX},${newY}`;
  
        if (
          newX >= 0 && newX < map[0].length &&
          newY >= 0 && newY < map.length &&
          map[newY][newX] === startValue &&
          !visited.has(newKey)
        ) {
          queue.push({ x: newX, y: newY });
        }
      }
    }
  
    return section;
};
  

const floodFill = (map) => {
    const visited = new Set();
    const floodSections = [];
  
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (!visited.has(`${x},${y}`)) {
          const section = bfs({ x, y }, map, visited);
          floodSections.push(section);
        }
      }
    }
  
    return floodSections;
};

const floodSections = floodFill(origMap);

// calc edges, there are equal amount of y and x edges, so we can just do either one and *2
const countingEdges = (section) => {
  let edges = 0;
  let buildingEdge = false;

  // shortcut for smaller areas
  if( [1,2].includes(section.length) ){
    return 4;
  }

  for( let y = 0; y < mapHeight; y++ ){

    buildingEdge = false;

    [-1, 1].forEach((dir) => {

      buildingEdge = false;

      for( let x = 0; x < mapWidth; x++ ){
          const currentPosSection = section.find((coord) => coord.x === x && coord.y === y);
          
          if( !currentPosSection ){
            if( buildingEdge ){
              buildingEdge = false;
              edges++;
            }

            continue;
          }

          const potentialArea = section.find((coord) => coord.x === x && coord.y === y + dir);

          // dismiss if we have area
          if( potentialArea ){
            if( buildingEdge ){
              buildingEdge = false;
              edges++;
            }
            
            continue;
          }

          // if last && we are here, add edge
          if( x === mapWidth - 1 ){
            buildingEdge = false;
            edges++;
            continue;
          }

          // still more to itr
          if( !buildingEdge ){
            buildingEdge = true;
            continue;
          }
      }
    });
  }

  return edges * 2;
}

let total = 0;

floodSections.forEach((section) => {
  const area = section.length;
  const edges = countingEdges(section);

  total += area * edges;
});

console.log(`1202: ${total}`);