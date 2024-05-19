import { direction } from '../direction';
export const initializeBoard = (
  bombMap: number[][],
  setBombMap,
  userInputs: number[][],
  setUserInputs,
  isFirstClick: boolean,
  levels,
  countBombBoard: number[][],
  levelsRowIndex: number,
  rowIndex: number,
  cellIndex: number,
) => {
  const newCountBombBoard = [...countBombBoard];
  const newBombBoard = [...bombMap];
  const Nums: number[][] = [];

  while (Nums.length < levels[levelsRowIndex].bombLength) {
    const Rowrandom = Math.floor(Math.random() * levels[levelsRowIndex].rowLength);
    const Cellrandom = Math.floor(Math.random() * levels[levelsRowIndex].columnLength);
    if (rowIndex === Rowrandom && cellIndex === Cellrandom) continue;
    if (Nums.some(([y, x]) => y === Rowrandom && x === Cellrandom)) continue;

    Nums.push([Rowrandom, Cellrandom]);
  }

  Nums.map((row) => {
    newCountBombBoard[row[0]][row[1]] = 11;
  });

  newCountBombBoard.map((row: number[], rowIndex: number) => {
    row.map((cell: number, cellIndex: number) => {
      if (cell === 11) return;
      let count = 0;
      direction.map((d) => {
        const x = cellIndex + d[0];
        const y = rowIndex + d[1];
        if (x < 0 || x > levels[levelsRowIndex].columnLength - 1) return;
        if (y < 0 || y > levels[levelsRowIndex].rowLength - 1) return;

        if (newCountBombBoard[y][x] === 0) return;
        if (newCountBombBoard[y][x] === 11) {
          count += 1;
        }
      });
      newCountBombBoard[rowIndex][cellIndex] = count;
    });
  });

  countBombBoard.map((row: number[], rowIndex: number) => {
    row.map((cell, cellIndex) => {
      if (cell === 0) return;
      newBombBoard[rowIndex][cellIndex] = cell;
    });
  });
  setBombMap(newBombBoard);
};
