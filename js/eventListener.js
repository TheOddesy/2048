// KEYBOARD ----------------------------------------------------------------

// Checks so the specified keys do not move the screen while one is playing.
// prettier-ignore
window.addEventListener( "keydown",function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
    .indexOf(e.code) > -1) {e.preventDefault();}},false
);

/*
Handles the events of the keyboard for the approved keystrokes.
Move with arrows or wasd. New game on n/N.
Calls for the program to handle the input for the given direction.
*/
window.onkeydown = function (e) {
  if (e.key === "ArrowUp" || e.key === "w") {
    handleMovement("Up");
  } else if (e.key === "ArrowDown" || e.key === "s") {
    handleMovement("Down");
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    handleMovement("Left");
  } else if (e.key === "ArrowRight" || e.key === "d") {
    handleMovement("Right");
  } else if (e.key === "n" || e.key === "N") {
    handleMovement(e.key);
  }
};

// TOUCH -------------------------------------------------------------------
const board = document.getElementById("board-container");

let startX = 0;
let startY = 0;

// Saves the x and y coordinates of where one touches the screen.
board.addEventListener(
  "touchstart",
  function (e) {
    e.preventDefault();
    startX = e.changedTouches[0].screenX;
    startY = e.changedTouches[0].screenY;
  },
  false
);

/*
Compares the x and y coordinates of where one touched down and where one lifted the touch.
Adjust so nothing happens for very small movement.
Adjusts so only the major direction of the swipe is handled.
 since no one can swipe in only one direction.

Only records the swipe for touches inside the game board.
Prevents default movement of the entire screen while swiping on the game board.
*/
board.addEventListener(
  "touchend",
  function (e) {
    e.preventDefault();
    const diffX = e.changedTouches[0].screenX - startX;
    const diffY = e.changedTouches[0].screenY - startY;
    const ratioX = Math.abs(diffX / diffY);
    const ratioY = Math.abs(diffY / diffX);
    const absDiff = Math.abs(ratioX > ratioY ? diffX : diffY);

    // Ignores small movements.
    if (absDiff < 30) {
      return;
    }

    // If x ratio is bigger, left or right
    if (ratioX > ratioY) {
      if (diffX >= 0) {
        handleMovement("Right");
      } else {
        handleMovement("Left");
      }
    } else {
      // If y ratio is bigger, up or down
      if (diffY >= 0) {
        handleMovement("Down");
      } else {
        handleMovement("Up");
      }
    }
  },
  false
);
