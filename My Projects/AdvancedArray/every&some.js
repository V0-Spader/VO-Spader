//some

function containsOdds (arr) {
    return arr.some(val => {
        return val % 2 !== 0;
    })
}

function hasZero (num) {
    return num.toString().split('').some(val => {
        return val === '0';
    })
}

//every

function onlyOdds(arr) {
    return arr.every(val => {
        return val % 2 !== 0;
    })
}

function noDupes(arr) {
    return arr.every(val => {
        return arr.indexOf(val) === arr.lastIndexOf(val);
    })
}

function hasKey(arr, key) {
    return arr.every(val => {
        return key in val
    });
}

function certainVal(arr, key, searchVal) {
    return arr.every(val => {
        return val[key] === searchVal;
    })
}