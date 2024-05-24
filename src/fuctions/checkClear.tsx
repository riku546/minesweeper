const checkClear = (countBombBoard: number[][], userInputs: number[][]) => {
  const bombPostionList: number[][] = [];
  const checkList: number[] = [];
  countBombBoard.map((row: number[], rowIndex: number) => {
    row.map((cell, cellIndex) => {
      if (cell === 11) {
        bombPostionList.push([rowIndex, cellIndex]);
      }
    });
  });

  userInputs.map((row: number[], rowIndex: number) => {
    row.map((cell, cellIndex) => {
      if (bombPostionList.some(([y, x]) => y === rowIndex && x === cellIndex)) return;
      if (cell === 0) {
        checkList.push(cell);
      }
    });
  });

  return checkList;
};

export default checkClear;
