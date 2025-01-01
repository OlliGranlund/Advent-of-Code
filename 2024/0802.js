const fs = require('fs');
const input = fs.readFileSync('input/08.txt', 'utf8');
const lines = input.split(/\n/);

const mapWidth = lines[0].split('').length;
const mapHeight = lines.length;
const map = [];
const antennas = {};
const antiNodes = [];

// build map
lines.forEach((line, yi) => {
  line.split('').forEach((value, xi) => {
    map.push({x: xi, y: yi, value})
  });
});

const renderDebug = (debugMap) => {
  // Visual debug
  const xaxis = lines[0].split('').length;
  const yaxis = lines.length;
  let debugLines = '';

  for(let y = 0; y < yaxis; y++){
    for(let x = 0; x < xaxis; x++){

      // const current = debugMap.find((coord) => coord.x === x && coord.y === y)
      let lineBuffer = '.';

      // find default val
      const defaultVal = debugMap.find((coord) => coord.x === x && coord.y === y);
      lineBuffer = defaultVal ? defaultVal.value : '.';

      debugLines += lineBuffer;
    }
    
    // add new row to debugLines
    debugLines += '\n';
  }

  // keep this console.log for debugging purposes
  console.log( debugLines );
};

// find all antennas
map.forEach((node) => {
  if( node.value !== '.'){

    if( !antennas[node.value] ){
      antennas[node.value] = [];
    }

    antennas[node.value].push({x: node.x, y: node.y});
  }
});

console.log( antennas );

// start creating antinodes
Object.keys(antennas).forEach((antenna) => {
  console.log(`creating antinodes for ${antenna}`);

  if(!antennas[antenna][1]){
    return;
  }

  if( antennas[antenna].length <= 1 ) {
    return;
  }

  antennas[antenna].forEach((node1) => {
    antennas[antenna].forEach((node2) => {
      if( node1 === node2 ){
        return;
      }

      const xDiff = node1.x - node2.x;
      const yDiff = node1.y - node2.y;      

      for(let i = 1; i < lines[0].split('').length + 2; i++){
        let antiNode1 = { x: node1.x + (xDiff * i), y: node1.y + (yDiff * i), value: '#' };
        let antiNode2 = { x: node2.x - (xDiff * i), y: node2.y - (yDiff * i), value: '#' };

        if(!antiNodes.find((node) => node.x === antiNode1.x && node.y === antiNode1.y)){
          antiNodes.push(antiNode1);
        }

        if(!antiNodes.find((node) => node.x === antiNode2.x && node.y === antiNode2.y)){
          antiNodes.push(antiNode2);
        }
      }
    });
  });
});

// merge all arrays inside antennas into one array, excluding keys with no or only one antenna
const mostAntennas = Object.values(antennas)
  .filter(antennaArray => antennaArray.length > 1)
  .reduce((acc, val) => acc.concat(val), []);

mostAntennas.forEach((node1) => {
  mostAntennas.forEach((node2) => {
    mostAntennas.forEach((node3) => {

      /*
      console.log(`itr mostAntennas ${node1.x},${node1.y} ${node2.x},${node2.y} ${node3.x},${node3.y}`);
      */

      // node1, node2 and node3 are all different
      if( node1 === node2 || node1 === node3 || node2 === node3 ){
        return;
      }

      // if node1 is the equal distance away from node2 and node3
      const xDiff1 = node1.x - node2.x;
      const yDiff1 = node1.y - node2.y;
      const xDiff2 = node1.x - node3.x;
      const yDiff2 = node1.y - node3.y;

      if( xDiff1 === xDiff2 && yDiff1 === yDiff2 ){
        return;
      }

      const antiNode = { x: node1.x, y: node1.y, value: '#' };
      if(!antiNodes.find((node) => node.x === antiNode.x && node.y === antiNode.y)){
        antiNodes.push(antiNode);
      }
      
    });
  });
});

// clean antiNodes
const filteredAntiNodes = antiNodes.filter((node) => {
  if( node.x < 0 || node.y < 0 || node.x >= mapWidth || node.y >= mapHeight ){
    return false;
  }
  return true;
});

// create new map with antiNodes, but so that they can only be placed if a point in the map has the character .
const mapWithAntiNodes = [];

map.forEach((node) => {
  // node.value = '.';
  if( node.value === '.' ){
    // find if we have a antiNode at this position
    const antiNode = filteredAntiNodes.find((antiNode) => antiNode.x === node.x && antiNode.y === node.y);
    node.value = antiNode ? antiNode.value : '.';
  }

  mapWithAntiNodes.push(node);
});

renderDebug(mapWithAntiNodes);

console.log(`0801: ${filteredAntiNodes.length}`);