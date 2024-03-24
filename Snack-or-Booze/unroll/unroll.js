function unroll(squareArray) {
    const result = [];

    while (squareArray.length) {
        // Move right
        result.push(...squareArray.shift());

        // Move down
        for (const row of squareArray) {
            if (row.length) {
                result.push(row.pop());
            }
        }

        // Move left
        if (squareArray.length) {
            result.push(...squareArray.pop().reverse());
        }

        // Move up
        for (let i = squareArray.length - 1; i >= 0; i--) {
            if (squareArray[i].length) {
                result.push(squareArray[i].shift());
            }
        }
    }

    return result;
}

export default unroll;
