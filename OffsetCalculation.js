const OFFSET = 50;
const BASE_OFFSET = 300;

/**
 * Get offset value for further animation
 *
 * @param {array} items preferably array of objects
 * @param numCols - number of columns we plan on rendering
 * @returns { number } offset values
 */

function applyOffset(items, numCols) {
    const diagonals = findDiagonals(items, numCols);

    diagonals.forEach((diag, i) => {
        diag.forEach(elm => {
            // eslint-disable-next-line no-param-reassign
            items[elm].offset = i * OFFSET + BASE_OFFSET;
        });
    });

    return items;
}

/**
 * First nested function part of getting offset value
 */

function findDiagonals(items, numCols) {
    const offsets = [];
    let i = 0;
    const numRows = Math.ceil(items.length / numCols);

    while (i < numRows) {
        offsets.push(getAscDiagonal(i, 0, numCols, items.length));
        i++;
    }
    i--;
    for (let j = 1; j < numCols; j++) {
        offsets.push(getAscDiagonal(i, j, numCols, items.length));
    }

    return offsets;
}

/**
 * Second nested function part of getting offset value
 */

function getAscDiagonal(i, j, numCols, maxLength) {
    const diagonal = [];
    while (i >= 0 && j < numCols) {
        const mappedIndex = i * numCols + j;
        if (mappedIndex < maxLength) diagonal.push(mappedIndex);
        // eslint-disable-next-line no-param-reassign
        i--;
        // eslint-disable-next-line no-param-reassign
        j++;
    }
    return diagonal;
}

export default applyOffset