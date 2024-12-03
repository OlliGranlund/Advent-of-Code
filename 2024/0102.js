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

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

leftArray.forEach(leftValue => {
  const occurrences = countOccurrences(rightArray, leftValue);
  total += leftValue * occurrences;
});

console.log(`0102: ${total}`);