//forEach functions
function doubleValues(arr) {
    let doubleArr = [];
    arr.forEach(val => {
        doubleArr.push(val * 2);
    });
    return doubleArr;
}

function onlyEvens(arr) {
    let evenArr = [];
    arr.forEach(val => {
        if(val % 2 === 0) {
            evenArr.push(val);
        }
    });
    return evenArr;
}

function firstAndLast(arr) {
    let newArr = [];
    arr.forEach(val => {
        newArr.push(val[0] + val[val.length - 1]);
    });
    return newArr;
}

function addKayAndValue(arr, key, val) {
    arr.forEach(val => {
        val[key] = val;
    });
    return arr;
}

function vowelCounter(str) {
    const vowels = "aeiou";
    let obj = {};
    let spliter = str.split("");
        spliter.forEach(letter => {
            let lowerCased = letter.toLowerCase()
            if(vowels.indexOf(lowerCased) !==-1) {
                if(obj[lowerCased]) {
                    obj[lowerCased]++;
                }
                else {
                    obj[lowerCased] = 1;
                }
            }
        });
        return obj;
}

//map functions
function doubleValMap(arr) {
    return arr.map(val => {
        return val * 2;
    });
}

function valTimesIndex(arr) {
    return arr.map((val, idx) => {
        return val[key];
    });
}

function keyExtractor(arr, key) {
    return arr.map(val => {
        return val[key];
    });
}

function fullNameExtractor(arr) {
    return arr.map(val => {
        return val.first + " " + val.last;
    });
}

//filter functons
function filterByValue(arr, key) {
    return arr.filter(val => {
        return val[key] !== undefined;
    });
}

function theFinder(arr, searchValue) {
    return arr.filter(val => {
        return val === searchValue;
    })[0];
}

function findInObject(arr, key, searchValue) {
    return arr.filter(val => {
        return val[key] === searchValue;
    })[0];
}

function noMoreVowels(str) {
    const vowels = "aeiou";
    return str.toLowerCase().split("").filter(val => {
        return vowels.indexOf(val) === -1;
    })
    .join("");
}

//map and filter together
function doubleOdds(arr) {
    return arr.filter(val => {
        return val % 2 !==0;
    })
    .map(val => {
        return val * 2;
    });
}