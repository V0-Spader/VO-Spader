//reduce

function valueExtractor(arr, key) {
    return arr.reduce((acc, next) => {
        acc.push(next[key]);
        return acc;
    });
}

function vowelCount(str) {
    const vowels = "aeiou";
    return str.split("").reduce((acc, next) => {
        let lowerCased = next.toLowerCase()
        if(vowels.indexOf(lowerCased)!== -1) {
            if(acc[lowerCased]){
                acc[lowerCased]++;
            }
        }
        return acc;
    });
}

function addKeyAndVal(arr, key, val) {
    return arr.reduce((acc, next, idx) => {
        acc[idx][key] = val;
        return acc;
    },arr);
}

function partition(arr, cb) {
    return arr.reduce((acc, next) => {
        if(cb(next) {
            acc[0].push(next);
        } else 
            {
            acc[i].push(next);
        }
    return acc; 
    },[[],[]]);
}