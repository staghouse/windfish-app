/*
*
* Note: ¯\_(ツ)_/¯
*
* Define our data for how the game map grid is laid out
* The "binary" data is used to define which screens on the map have an entrance
*
*/

import binaryScreens from './binary';

const cols = 16;
let colCount = 1;
let rowCount = 1;
let screens = [];

binaryScreens.forEach((point, index) => {
    if (colCount > cols) {
        colCount = 1;
        rowCount++;
    }

    // // >.>
    // if (
    //     (rowCount === 1 && colCount === 5) ||
    //     (rowCount === 2 && colCount === 14) ||
    //     (rowCount === 4 && colCount === 5) ||
    //     (rowCount === 5 && colCount === 2) ||
    //     (rowCount === 6 && colCount === 13) ||
    //     (rowCount === 6 && colCount === 14) ||
    //     (rowCount === 7 && colCount === 13) ||
    //     (rowCount === 8 && colCount === 2) ||
    //     (rowCount === 15 && colCount === 6)
    // ) {
    //     hasChest = true;
    // }

    let screen = {
        id: index + 1,
        hasEntrance: Boolean(parseInt(point)),
        row: rowCount,
        column: colCount,
        coordinates: `${rowCount}, ${colCount}`,
    };

    screens.push(screen);

    colCount++;
});

export default screens;
