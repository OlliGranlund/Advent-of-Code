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

const swapper = (array, index1, index2) => {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;

  return array;
}

const fixPageArrayByRules = (pageArray, rules) => { 
  pageArray.forEach((pagex, x) => {
    pageArray.forEach((pagey, y) => {
      rules.forEach((rule) => {
        // if index in pageArray is earlier than the other, swap them
        if( rule[0] === pagey && rule[1] === pagex && x > y ){
          pageArray = swapper(pageArray, x, y);
        }
      });
    });
  });

  return pageArray;
};


rules = arrayCleaner(rules, '|');
pages = arrayCleaner(pages, ',');

pages.forEach((pageArray) => {
  if( !checkPageRules(pageArray) ){
    const fixedPageArray = fixPageArrayByRules(pageArray, rules);
    total += fixedPageArray[Math.floor(fixedPageArray.length / 2)];
  }
});

console.log(`0502: ${total}`);