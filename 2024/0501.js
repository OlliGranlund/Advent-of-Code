const fs = require('fs');
const input = fs.readFileSync('input/05.txt', 'utf8');
const lines = input.split(/\n/);

let total = 0;
let rules = []
let pages = [];
let readingRules = true;

// setup rules and pages
lines.forEach((line) => {

  if( line === ''){
    readingRules = false;
    return;
  }

  if( readingRules ){
    rules.push(line);
  } else {
    pages.push(line);
  }
});

const arrayCleaner = (array, separator) => {
  return array.map((single) => {
    return single.split(separator).map((part) => {
      return parseInt(part)
    });
  });
}


const checkPageRules = (pageArray) => {
  let ruleValidity = true;

  rules.forEach((rule) => {
    const earlier = rule[0];
    const later = rule[1];

    if( !ruleValidity ){
      return;
    }

    if(
      pageArray.includes(earlier) &&
      pageArray.includes(later)
    ){
      if( pageArray.indexOf(earlier) > pageArray.indexOf(later) ){
        ruleValidity = false;
      }
    }
  });

  return ruleValidity;
};

rules = arrayCleaner(rules, '|');
pages = arrayCleaner(pages, ',');

pages.forEach((pageArray) => {
  if( checkPageRules(pageArray) ){
    total += pageArray[Math.floor(pageArray.length / 2)];
  }
});

console.log(`0501: ${total}`);