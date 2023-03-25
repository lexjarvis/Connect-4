const WIDTH = 7;
const HEIGHT = 6;
let currPlayer = 1;
const board = [];

// create empty HEIGHT x WIDTH matrix array
function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

// create HTML table and row of column tops
function makeHtmlBoard() {
  const htmlBoard = document.querySelector("#board");

// create top row for selecting column to drop a piece
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

// create rows and cells for the board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
  for (let x = 0; x < WIDTH; x++) {
    const cell = document.createElement("td");
    cell.setAttribute("id", `${y}-${x}`);
    row.append(cell);
    }
  htmlBoard.append(row);
  }
}

// find top empty cell in column x (null if filled)
function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

// add piece to the HTML table
function placeInTable(y, x) {
  const piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  const cell = document.getElementById(`${y}-${x}`);
  cell.append(piece);
}

// pop up alert message to announce the end of the game
function endGame(msg) {
  alert(msg);
}

// handle the click on the top row to drop a piece in the selected column
function handleClick(evt) {
  const x = +evt.target.id;
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

// update the board with the current player's piece
  board[y][x] = currPlayer;
  placeInTable(y, x);

// check for win
// if a player has won, call the endGame function to display a message indicating winner
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

// check for tie
// if there is a tie, call the endGame function to display a message stating there was a tie
  if (board.every(row => row.every(cell => cell))) {
    return endGame("Tie!");
  }

// switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}

// check if there are four cells in a row with the same player
function checkForWin() {
function _win(cells) {
// Check four cells to see if they're all color of current player
  return cells.every(
    ([y, x]) =>
      y >= 0 && 
      y < HEIGHT && 
      x >= 0 && 
      x < WIDTH && 
      board[y][x] === currPlayer
    );
}

// check for horizontal, vertical, and diagonal wins
for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
  const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
  const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
  const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
  const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

// find winner
  if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
    return true;
  }
 }
}
}

makeBoard();
makeHtmlBoard();