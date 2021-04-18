// ------------------------------------------------------------------------

// If there are no empty tiles and no possible moves the game is over.
// If the game is over call upon the appropiate message.
function isGameOver() {
  for (let i = 0; i < this.rowNum; i++) {
    for (let j = 0; j < this.colNum; j++) {
      if (this.matrix[i][j] == "" || canMoveWithAdjacent(i, j)) {
        return false;
      }
    }
  }
  gameOverView();
  return true;
}

// Checks if this tile is able to merge to an adjacent tile
function canMoveWithAdjacent(row, col) {
  if (row > 0 && this.matrix[row][col] == this.matrix[row - 1][col]) {
    return true;
  } else if (
    row < this.rowNum - 1 &&
    this.matrix[row][col] == this.matrix[row + 1][col]
  ) {
    return true;
  } else if (col > 0 && this.matrix[row][col] == this.matrix[row][col - 1]) {
    return true;
  } else if (
    col < this.colNum - 1 &&
    this.matrix[row][col] == this.matrix[row][col + 1]
  ) {
    return true;
  } else {
    return false;
  }
}

// Creates a message container with the appropiate message.
function gameOverView() {
  createMessageContainer("Game Over!");
}

// ------------------------------------------------------------------------

// If there is a tile with the value 2048 the player has won.
// If the game is won call upon the appropiate message.
function isGameWon() {
  for (let i = 0; i < this.rowNum; i++) {
    for (let j = 0; j < this.colNum; j++) {
      if (this.matrix[i][j] == 2048) {
        gameWonView();
        return true;
      }
    }
  }
  return false;
}

// Creates a message container with the appropiate message.
function gameWonView() {
  createMessageContainer("You Win!");
}

/* 
Creates a message container ontop of the whole game board.
Adds the incomming string as a message
Adds a button to start a new game and remove the message.
Removes the possibility to move tiles as long as this message is there.
Sets a variation of classes for css styling.
*/
function createMessageContainer(message) {
  const messageContainer = document.createElement("div");
  messageContainer.setAttribute("class", "message-container");

  const messageContent = document.createElement("div");
  messageContent.setAttribute("class", "message-content");
  messageContent.innerHTML = message;

  const newGameButton = document.createElement("button");
  newGameButton.setAttribute("class", "new-game-button");
  newGameButton.setAttribute("onclick", "newGame()");
  newGameButton.innerHTML = "Try Again?";

  messageContainer.appendChild(messageContent);
  messageContainer.appendChild(newGameButton);

  this.boardElement.appendChild(messageContainer);
  this.boardElement = null;
}
