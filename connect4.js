"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7; //x
const HEIGHT = 6; //y

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])


/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++){
    let row = [];
    for (let x = 0; x < WIDTH; x++){
      // let column = null;
      row.push(null);
    }
    board.push(row);
  }
  console.log(board);
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');

  //  create clickable row where pieces will be dropped
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //  fill clickable row with cells and add id
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    //  Create a table row element and assign to a "row" variable
    const row = document.createElement('tr');

    for (let x = 0; x < WIDTH; x++) {
      //  Create a table cell element and assign to a "cell" variable
      const cell = document.createElement('td');
      //  add an id, c-y-x, to the above table cell element
      // you'll use this later, so make sure you use c-y-x
       cell.setAttribute('id', `c-${y}-${x}`);
      //  append the table cell to the table row
      row.append(cell);
    }
    //  append the row to the html board
    htmlBoard.append(row);
  }
}
//!! change appendChild -> append; let row -> const row;

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // write the real version of this, rather than always returning 5
  for (let y = HEIGHT-1; y >= 0; y--){
    if (board[y][x] === null) return y;
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // make a div and insert into correct table cell

  //declare a var assigned to a createElement(div)
  const piece = document.createElement('div');
  piece.classList.add('piece');

  if (currPlayer === 1){
    piece.classList.add('p1');
  } else {
    piece.classList.add('p2');
  }

  const pieceSlot = document.getElementById(`c-${y}-${x}`);
  console.log(`c-${y}-${x}`)
  console.log(pieceSlot)
  pieceSlot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
  console.log("x=", x);

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  placeInTable(y, x);


  // add line to update in-memory board
  board[y][x] = currPlayer;
  console.log(board);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // check if all cells in board are filled; if so call, call endGame
   if (board.every ((row) => !row.includes(null))){
    endGame();
    }


  // switch players
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
  console.log("currPlayer = p", currPlayer);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDL =[[y, x], [y - 1, x - 1], [y - 2, x - 2], [y - 3, x - 3]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
