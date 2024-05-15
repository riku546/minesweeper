import { direction } from "../direction";
export const initializeBoard = (bombMap:number[][] , setBombMap , userInputs:number[][] , setUserInputs , isFirstClick ) => {
  const countBombBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  // const customeBoard = (row, column) => {
  //   const initBoard = [];
  //   const board = [];

  //   for (let i = 0; i < row; i++) {
  //     board.push(200);
  //   }

  //   for (let i = 0; i < column; i++) {
  //     initBoard.push(board);
  //     countBombBoard.push(board)
  //   }
  //   console.log(countBombBoard)
  //   console.log(initBoard)
  //   setBombMap(initBoard)
  //   setUserInputs(initBoard)
  // };


  //   customeBoard(20 , 20)





  const newBombBoard = [...bombMap];
  const Nums = [];

  for (let i = 0; i < 10; i++) {
    const Rowrandom = Math.floor(Math.random() * 9);
    const Cellrandom = Math.floor(Math.random() * 9);
    Nums.push([Rowrandom, Cellrandom]);
  }
  Nums.map((row) => {
    newBombBoard[row[0]][row[1]] = 8;
  });



    newBombBoard.map((row : number[], rowIndex:number) => {
      row.map((cell:number, cellIndex:number) => {
        if (cell === 8) return;
        let count = 0;
        direction.map((d) => {
          const x = cellIndex + d[0];
          const y = rowIndex + d[1];
          if (x < 0 || x > 8) return;
          if (y < 0 || y > 8) return;


          if (newBombBoard[y][x] === 0) return;
          if (newBombBoard[y][x] === 8) {
            count += 1;
          }
        });
        countBombBoard[rowIndex][cellIndex] = count;
      });
    });



    countBombBoard.map((row, rowIndex) => {
      row.map((cell, cellIndex) => {
        if (cell === 0) return;
        newBombBoard[rowIndex][cellIndex] = cell;
      });
    });

   setBombMap(newBombBoard)


};
