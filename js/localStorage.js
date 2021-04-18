// ------------------------------------------------------------------------
/*
Sets or Gets different data from the localstorage.
This so when a player refreshes the page or comes back to the page
They can resume their game from where they left.

Converts to JSON when saving and converts to the original value when retrieving.
*/

// Get the board state, if there is any.
function getBoardState() {
  return JSON.parse(localStorage.getItem("boardState"));
}

// Get the score value, if there is any.
function getScore() {
  return JSON.parse(localStorage.getItem("score"));
}

// Get the best score value, if there is any.
function getBestSCore() {
  return JSON.parse(localStorage.getItem("bestScore"));
}

// Sets or updates the state of the board in the local storage.
function setBoardState(matrix) {
  localStorage.setItem("boardState", JSON.stringify(matrix));
}

// Sets or updates the score value in the local storage.
function setScore(score) {
  localStorage.setItem("score", JSON.stringify(score));
}

// Sets or updates the best score value in the local storage.
function setBestScore(bestScore) {
  localStorage.setItem("bestScore", JSON.stringify(bestScore));
}
