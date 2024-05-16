import { direction } from '../direction';
export const initializeBoard = (
  bombMap: number[][],
  setBombMap,
  userInputs: number[][],
  setUserInputs,
  isFirstClick,
  levels,
  countBombBoard,
  levelsRowIndex: number,
) => {
  console.log(levels)
  console.log(levelsRowIndex)

  const newBombBoard = [...bombMap];
  const Nums = [];

  for (let i = 0; i < levels[levelsRowIndex].bombLength; i++) {
    const Rowrandom = Math.floor(Math.random() * levels[levelsRowIndex].rowLength);
    const Cellrandom = Math.floor(Math.random() * levels[levelsRowIndex].columnLength);
    Nums.push([Rowrandom, Cellrandom]);
  }
  Nums.map((row) => {
    newBombBoard[row[0]][row[1]] = 8;
  });

  newBombBoard.map((row: number[], rowIndex: number) => {
    row.map((cell: number, cellIndex: number) => {
      if (cell === 8) return;
      let count = 0;
      direction.map((d) => {
        const x = cellIndex + d[0];
        const y = rowIndex + d[1];
        if (x < 0 || x > levels[levelsRowIndex].rowLength - 1) return;
        if (y < 0 || y > levels[levelsRowIndex].columnLength - 1) return;

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

  setBombMap(newBombBoard);
};
