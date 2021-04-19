// ------------------------------------------------------------------------

/* 
Retieves the tile at the starting position
Changes its class and thus changing its ending position.
Sets it z-index to be higher than the empty tile created in its place.
Thanks to css transition the tile will "move" to its new position.
*/
function tileAnimation(rowStart, rowEnd, colStart, colEnd, value) {
  setBlankTile(rowStart, colStart);
  const tile = document.getElementsByClassName(
    "tile" + " position-" + rowStart + "-" + colStart + " value-" + value
  )[0];
  tile.style.zIndex = 2;

  tile.className =
    "tile" + " position-" + rowEnd + "-" + colEnd + " value-" + value;
}

// Creates a tile with empty value at the starting position of the movement.
// Gives it a lower z-index so that its not ontop of the moving tile.
function setBlankTile(row, col) {
  const tile = document.createElement("div");
  tile.setAttribute(
    "class",
    "tile" + " position-" + row + "-" + col + " value-"
  );
  tile.style.zIndex = 1;
  this.boardElement.appendChild(tile);
}

// ------------------------------------------------------------------------

/* 
Move functions for all 4 directions. Up, Down, Left, Right.
Checks and adds tiles in the direction given, starting by the tiles nearest the direction.
More than one pair of tiles can be added in any row or column.
But no tile that has been newly added can be added again in the same turn.

This part needs formating and can be better divided into smaller functions.
This will help with code redability and reduce code structure repetition.
*/

function moveUp() {
  // Variable so we know if to create a new tile after this move
  var tilesHaveMoved = false;
  // Traverse towards the dominant direction.
  for (let col = 0; col < this.colNum; col++) {
    // Saves if there are any tiles that have been moved this turn for each new column.
    const movedArray = [];
    for (let row = 0; row < this.rowNum; row++) {
      var currentValue = this.matrix[row][col];
      // If there is a value the way we are heading, otherwise nothing.
      if (currentValue != "") {
        let nextRow;
        let cellIterator = row;
        let nextValue = "";

        // Set the cell iterator in the correct starting position.
        while (cellIterator > 0 && nextValue == "") {
          cellIterator--;
          nextValue = this.matrix[cellIterator][col];
        }

        // Change the position of where the value should end up
        // depending on its adjecent tiles.
        // Merges with the next cell that has the same value and has not merged this turn.
        // Otherwise moves in the direction as much as possible.
        if (
          nextValue == currentValue &&
          nextValue != "" &&
          !movedArray[cellIterator]
        ) {
          this.matrix[row][col] = "";
          this.matrix[cellIterator][col] = currentValue * 2;
          this.score += currentValue * 2;
          nextRow = cellIterator;
          movedArray[cellIterator] = true;
        } else if (nextValue == "") {
          this.matrix[row][col] = "";
          this.matrix[0][col] = currentValue;
          nextRow = 0;
        } else {
          this.matrix[row][col] = "";
          this.matrix[cellIterator + 1][col] = currentValue;
          nextRow = cellIterator + 1;
        }

        // If the tile has moved, true and animate the moving tile.
        if (row != nextRow) {
          tilesHaveMoved = true;
          tileAnimation(row, nextRow, col, col, currentValue);
        }
      }
    }
  }
  return tilesHaveMoved;
}

function moveDown() {
  var tilesHaveMoved = false;
  for (let col = 0; col < this.colNum; col++) {
    const movedArray = [];
    for (let row = this.rowNum - 1; row >= 0; row--) {
      var currentValue = this.matrix[row][col];
      if (currentValue != "") {
        let nextRow;
        let cellIterator = row;
        let nextValue = "";

        while (cellIterator < this.rowNum - 1 && nextValue == "") {
          cellIterator++;
          nextValue = this.matrix[cellIterator][col];
        }

        if (
          nextValue == currentValue &&
          nextValue != "" &&
          !movedArray[cellIterator]
        ) {
          this.matrix[row][col] = "";
          this.matrix[cellIterator][col] = currentValue * 2;
          this.score += currentValue * 2;
          nextRow = cellIterator;
          movedArray[cellIterator] = true;
        } else if (nextValue == "") {
          this.matrix[row][col] = "";
          this.matrix[this.rowNum - 1][col] = currentValue;
          nextRow = this.rowNum - 1;
        } else {
          this.matrix[row][col] = "";
          this.matrix[cellIterator - 1][col] = currentValue;
          nextRow = cellIterator - 1;
        }

        if (row != nextRow) {
          tilesHaveMoved = true;
          tileAnimation(row, nextRow, col, col, currentValue);
        }
      }
    }
  }
  return tilesHaveMoved;
}

function moveLeft() {
  var tilesHaveMoved = false;
  for (let row = 0; row < this.rowNum; row++) {
    const movedArray = [];
    for (let col = 0; col < this.colNum; col++) {
      var currentValue = this.matrix[row][col];
      if (currentValue != "") {
        let nextCol;
        let cellIterator = col;
        let nextValue = "";

        while (cellIterator > 0 && nextValue == "") {
          cellIterator--;
          nextValue = this.matrix[row][cellIterator];
        }

        if (
          nextValue == currentValue &&
          nextValue != "" &&
          !movedArray[cellIterator]
        ) {
          this.matrix[row][col] = "";
          this.matrix[row][cellIterator] = currentValue * 2;
          this.score += currentValue * 2;
          nextCol = cellIterator;
          movedArray[cellIterator] = true;
        } else if (nextValue == "") {
          this.matrix[row][col] = "";
          this.matrix[row][0] = currentValue;
          nextCol = 0;
        } else {
          this.matrix[row][col] = "";
          this.matrix[row][cellIterator + 1] = currentValue;
          nextCol = cellIterator + 1;
        }

        if (col != nextCol) {
          tilesHaveMoved = true;
          tileAnimation(row, row, col, nextCol, currentValue);
        }
      }
    }
  }
  return tilesHaveMoved;
}

function moveRight() {
  var tilesHaveMoved = false;
  for (let row = 0; row < this.rowNum; row++) {
    const movedArray = [];
    for (let col = this.colNum - 1; col >= 0; col--) {
      var currentValue = this.matrix[row][col];
      if (currentValue != "") {
        let nextCol;
        let cellIterator = col;
        let nextValue = "";

        while (cellIterator < this.colNum - 1 && nextValue == "") {
          cellIterator++;
          nextValue = this.matrix[row][cellIterator];
        }

        if (
          nextValue == currentValue &&
          nextValue != "" &&
          !movedArray[cellIterator]
        ) {
          this.matrix[row][col] = "";
          this.matrix[row][cellIterator] = currentValue * 2;
          this.score += currentValue * 2;
          nextCol = cellIterator;
          movedArray[cellIterator] = true;
        } else if (nextValue == "") {
          this.matrix[row][col] = "";
          this.matrix[row][this.colNum - 1] = currentValue;
          nextCol = this.colNum - 1;
        } else {
          this.matrix[row][col] = "";
          this.matrix[row][cellIterator - 1] = currentValue;
          nextCol = cellIterator - 1;
        }

        if (col != nextCol) {
          tilesHaveMoved = true;
          tileAnimation(row, row, col, nextCol, currentValue);
        }
      }
    }
  }
  return tilesHaveMoved;
}
