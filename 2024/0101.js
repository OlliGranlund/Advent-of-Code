const fs = require('fs');
const input = fs.readFileSync('input/01.txt', 'utf8');
const inputAsArray = input.split(/\n/);

let total = 0;
const leftArray = [];
const rightArray = [];

inputAsArray.forEach(line => {
  const [left, right] = line.split('   ').map(Number);
  leftArray.push(left);
  rightArray.push(right);
});

leftArray.sort((a, b) => a - b);
rightArray.sort((a, b) => a - b);

leftArray.forEach((leftValue, i) => {
  total += Math.abs(leftValue - rightArray[i]);
});

console.log(`0101: ${total}`);