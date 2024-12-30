const fs = require('fs');
const input = fs.readFileSync('input/10.txt', 'utf8');
//const input = fs.readFileSync('input/10test.txt', 'utf8');
const lines = input.split(/\n/);

const mapHeight = lines.length;
const mapWidth = lines[0].split('').length;

const map = [];

// build map
lines.forEach((line, y) => {
  const xvalues = line.split('');

  xvalues.forEach((height, x) => {
    const cleanHeight = height === '.' ? 999 : parseInt(height);
    map.push({x, y, height: cleanHeight})
  });
});

const adjacencyList = new Map();

const addNode = ( node ) => {
  adjacencyList.set(node, [])
}

const addEdge = (origin, destination) => {
  adjacencyList.get(origin).push(destination)
  adjacencyList.get(destination).push(origin)
}

// Add all nodes
map.forEach(node => addNode(node));

// Add all edges
map.forEach((node, idx, list) => {
  const { x, y, height } = node;
  const up = list.find(n => n.x === x && n.y === y - 1);
  const right = list.find(n => n.x === x + 1 && n.y === y);
  const left = list.find(n => n.x === x - 1 && n.y === y);
  const down = list.find(n => n.x === x && n.y === y + 1);

  const subtleSlope = (h1, h2) => {
    const diff = h1 - h2;

    if( diff === 1){
      return true
    }

    return false;
  }

  if (up && subtleSlope(height, up.height)) {
    addEdge(node, up);
  }
  if (right && subtleSlope(height, right.height)) {
    addEdge(node, right);
  }
  if (left && subtleSlope(height, left.height)){
    addEdge(node, left);
  }
  if (down && subtleSlope(height, down.height)) {
    addEdge(node, down);
  }
});

const bfs = (start, end) => {
  const queue = [start];
  const visited = new Set();
  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();
    const neighbors = adjacencyList.get(node);

    for (const neighbor of neighbors) {
      if (neighbor === end) {
        return 1;
      }

      if (!visited.has(neighbor) && neighbor.height === node.height + 1) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return 0;
};

const startPoints = map.filter((node) => node.height === 0);
const endPoints = map.filter((node) => node.height === 9);

let potentialPaths = 0;

startPoints.forEach((start, idx, list) => {
  let startPointPathCount = 0;

  endPoints.forEach((end, idx, list) => {
    startPointPathCount += bfs(start, end);
  });

  potentialPaths += startPointPathCount;
});


console.log(`1001: ${potentialPaths}`);
