// ------------------------------------------------------------------------
/* 
TODO LIST

Enable Swipe on mobile.
tooltip on newgame button to show that you can also press n to start a new game.

Change/fix moveTiles. Do not add tiles that were added in this "turn".
*/

// ------------------------------------------------------------------------

/*
Initialises a game.
If there is a saved game in the local storage create a game from that.
Otherwise create a new empty game.
*/
window.onload = function () {
  this.boardElement = document.getElementById("board-container");
  this.scoreContainer = document.getElementById("scoreValue");
  this.bestScoreContainer = document.getElementById("bestScoreValue");
  this.rowNum = 4;
  this.colNum = 4;

  if (getBoardState()) {
    this.matrix = getBoardState();
    this.score = getScore();
    updateViewFromMatrix();
    updateScore();
  } else {
    newGame();
  }
};

// ----------- --- --- --- --- --- --- --- ---

// Resets and updates everything needed to create a new empty game.
function newGame() {
  this.boardElement = document.getElementById("board-container");
  this.score = 0;
  this.matrix = [];
  initializeMatrix();
  updateViewFromMatrix();
  updateStorage();
  updateScore();
}

// Creates a matrix with the specified size with empty values.
// Creates the first two tiles.
function initializeMatrix() {
  for (let i = 0; i < this.rowNum; i++) {
    var aRow = [];
    for (let j = 0; j < this.colNum; j++) {
      const value = "";
      aRow.push(value);
    }
    this.matrix.push(aRow);
  }
  createTile();
  createTile();
}

// ------------------------------------------------------------------------

/* 
Update the screen to show how the matrix has been changed.
Remove past tiles so only the new ones are in the board.
Gives tiles the right classes for css styling.

Creates en empty tile before the tile with a value on every position.
This is for when the tile "on top", the one with a value, is moved.
Because of troubles in Safari with css transition and z-index.
*/
function updateViewFromMatrix() {
  this.boardElement.innerHTML = "";
  for (let i = 0; i < this.rowNum; i++) {
    for (let j = 0; j < this.colNum; j++) {
      //Creates an empty tile on every position.
      const emptyTile = document.createElement("div");
      emptyTile.setAttribute(
        "class",
        "tile" + " position-" + i + "-" + j + " value-"
      );
      this.boardElement.appendChild(emptyTile);
      // The tile with the correct value
      const tile = document.createElement("div");
      const cellValue = this.matrix[i][j];
      tile.innerHTML = cellValue;
      tile.setAttribute(
        "class",
        "tile" + " position-" + i + "-" + j + " value-" + cellValue
      );
      this.boardElement.appendChild(tile);
    }
  }
}

// ------------------------------------------------------------------------

/*
Moves the tiles in the specified direction
N/n for a new game.

If no movement is done, no new tile is created.

Timeoutfunction so css transition can happen before board is updated.
Calls for updates on all visuals and checks if game is won or lost.
*/
function handleMovement(direction) {
  if (direction == "Up") {
    if (moveUp()) createTile();
  } else if (direction == "Down") {
    if (moveDown()) createTile();
  } else if (direction == "Left") {
    if (moveLeft()) createTile();
  } else if (direction == "Right") {
    if (moveRight()) createTile();
  } else if (direction == "n" || direction == "N") {
    newGame();
  }

  setTimeout(function () {
    updateViewFromMatrix();
    updateStorage();
    updateScore();
    isGameWon();
    isGameOver();
  }, 200);
}

// ------------------------------------------------------------------------

// Update the localstorage of the matrix and score.
// If the score is better than the best score update that as well.
function updateStorage() {
  setBoardState(this.matrix);
  setScore(this.score);
  // If there is nothing back from the method set it to 0;
  if (getBestSCore() == null) {
    setBestScore(0);
  }
  if (this.score > getBestSCore()) {
    setBestScore(this.score);
  }
}

// Update the score and best score on the screen
function updateScore() {
  this.scoreContainer.innerHTML = this.score;
  this.bestScoreContainer.innerHTML = getBestSCore();
}

// ------------------------------------------------------------------------

// Put in the matrix a new tile on a random position that is not occupied.
function createTile() {
  let rowRandom;
  let colRandom;
  do {
    rowRandom = getRandomPos(this.rowNum);
    colRandom = getRandomPos(this.colNum);
  } while (this.matrix[rowRandom][colRandom] != "");
  // A new tile should have a 10% chance of being a 4, otherwise a 2.
  this.matrix[rowRandom][colRandom] = Math.random() < 0.9 ? 2 : 4;
}

// Get a random integer between zero and num.
function getRandomPos(num) {
  return Math.floor(Math.random() * num);
}

// ------------------------------------------------------------------------
