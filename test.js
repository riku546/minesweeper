
const boards = [];
const board = [];
const Nums = []
for (let cell = 0; cell < 9; cell++) {
  board.push(0);
}
for (let cell = 0; cell < 9; cell++) {
  boards.push(board);
}

console.log(boards);


for(let i = 0; i < 9 ; i++){

    const Rowrandom = Math.floor(Math.random() * 9);
    const Cellrandom = Math.floor(Math.random() * 9);
    
    Nums.push([Rowrandom, Cellrandom]);

}


Nums.map((row , rowIndex)=>{
    row.map((cell , cellIndex)=>{
        boards[rowIndex][cellIndex] = 20
    })
})

console.log(boards)


