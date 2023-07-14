//Map callback arrow function shorthand
const double = arr => arr.map(val => val * 2);

//Refactored function 
const squareAndFindEvens = numbers => numbers.map(val => val ** 2).filter(square => square % 2 === 0);