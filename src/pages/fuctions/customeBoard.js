const boards = [];
const board = [];


for (let i = 0; i < 9; i++) {
  board.push(0);
}

for (let i = 0; i < 9; i++) {
  boards.push(board);
}

console.log(board);
console.log(boards);
