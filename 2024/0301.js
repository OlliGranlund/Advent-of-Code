const fs = require('fs');
const input = fs.readFileSync('input/03.txt', 'utf8');
const inputAsString = input.split(/\n/).join('');

let total = 0;
const regex = /mul\(\d{1,3},\d{1,3}\)/g;

const matches = inputAsString.match(regex);

matches.forEach((match) => {
  const [a, b] = match.replace('mul(', '').replace(')', '').split(',');
  total += a * b;
});


console.log(`0301: ${total}`);