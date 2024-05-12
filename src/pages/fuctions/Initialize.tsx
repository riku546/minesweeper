
export const initializeBoard = (bombMap:number[][] , setBombMap) => {
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

  const direction = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];
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



    newBombBoard.map((row, rowIndex) => {
      row.map((cell, cellIndex) => {
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
