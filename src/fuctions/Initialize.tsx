const initializeBoard = (
  direction: number[][],
  rowIndex: number,
  cellIndex: number,
  countBombBoard: number[][],
  levelInfo: { height: number; width: number; NumBomb: number },
) => {
  const newCountBombBoard = [...countBombBoard];
  const Nums: number[][] = [];

  while (Nums.length < levelInfo.NumBomb) {
    const Rowrandom = Math.floor(Math.random() * levelInfo.height);
    const Cellrandom = Math.floor(Math.random() * levelInfo.width);
    if (rowIndex === Rowrandom && cellIndex === Cellrandom) continue;
    if (Nums.some(([y, x]) => y === Rowrandom && x === Cellrandom)) continue;

    Nums.push([Rowrandom, Cellrandom]);
  }

  for (const row of Nums) {
    newCountBombBoard[row[0]][row[1]] = 11;
  }

  newCountBombBoard.map((row: number[], rowIndex: number) => {
    row.map((cell: number, cellIndex: number) => {
      if (cell === 11) return;
      let count = 0;
      direction.map((d) => {
        const x = cellIndex + d[0];
        const y = rowIndex + d[1];
        if (x < 0 || x > levelInfo.width - 1) return;
        if (y < 0 || y > levelInfo.height - 1) return;

        if (newCountBombBoard[y][x] === 0) return;
        if (newCountBombBoard[y][x] === 11) {
          count += 1;
        }
      });
      newCountBombBoard[rowIndex][cellIndex] = count;
    });
  });

  return newCountBombBoard;
};

export default initializeBoard;
