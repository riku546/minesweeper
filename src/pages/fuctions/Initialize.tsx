import { direction } from '../direction';
export const initializeBoard = (
  bombMap: number[][],
  setBombMap:number[][],
  userInputs: number[][],
  setUserInputs:number[][],
  isFirstClick:boolean,
  levels,
  countBombBoard:number[][],
  levelsRowIndex: number,
) => {

  const newCountBombBoard = [...countBombBoard]
  const newBombBoard = [...bombMap];
  const Nums = [];

  for (let i = 0; i < levels[levelsRowIndex].bombLength; i++) {
    const Rowrandom = Math.floor(Math.random() * levels[levelsRowIndex].rowLength);
    const Cellrandom = Math.floor(Math.random() * levels[levelsRowIndex].columnLength);
    Nums.push([Rowrandom, Cellrandom]);
  }
  console.log(Nums)
  Nums.map((row) => {
    newCountBombBoard[row[0]][row[1]] = 8;
  });
  console.log(newCountBombBoard)


  newCountBombBoard.map((row: number[], rowIndex: number) => {
    row.map((cell: number, cellIndex: number) => {
      if (cell === 8) return;
      let count = 0;
      direction.map((d) => {
        const x = cellIndex + d[0];
        const y = rowIndex + d[1];
        if (x < 0 || x > levels[levelsRowIndex].columnLength - 1) return;
        if (y < 0 || y > levels[levelsRowIndex]. rowLength - 1) return;

        if (newCountBombBoard[y][x] === 0) return;
        if (newCountBombBoard[y][x] === 8) {
          count += 1;
        }
      });
      newCountBombBoard[rowIndex][cellIndex] = count;
    });
  });

  countBombBoard.map((row:number[], rowIndex:number) => {
    row.map((cell, cellIndex) => {
      if (cell === 0) return;
      newBombBoard[rowIndex][cellIndex] = cell;
    });
  });
  console.log(newBombBoard)
  setBombMap(newBombBoard);
};
