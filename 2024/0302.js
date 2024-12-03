const fs = require('fs');
const input = fs.readFileSync('input/03.txt', 'utf8');
const inputAsString = input.split(/\n/).join('');

let total = 0;

const regexStarter = /do\(\)/g;
const regexStopper = /don't\(\)/g;
const regexValues = /mul\(\d{1,3},\d{1,3}\)/g;


const validStringStarts = inputAsString.split(regexStarter);

validStringStarts.forEach((validStringStart) => {
  const splitStringStarts = validStringStart.split(regexStopper);
  const matches = splitStringStarts[0].match(regexValues);

  if( matches ){
    matches.forEach((match) => {
      const [a, b] = match.replace('mul(', '').replace(')', '').split(',');
      total += a * b;
    });
  }
});

console.log(`0302: ${total}`);