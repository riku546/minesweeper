const openEmptySquare = (
    direction: number[][],
    rowIndex: number,
    cellIndex: number,
    results: number[][],
    levelInfo:{height:number , width:number , NumBomb:number},
    countBombBoard: number[][],
  ) => {
    const temporaryResult: number[][] = [];
    direction.map((row) => {
      const y = rowIndex + row[1];
      const x = cellIndex + row[0];
  
      if (x < 0 || x > levelInfo.width - 1) return;
      if (y < 0 || y > levelInfo.height - 1) return;
  
      if (countBombBoard[y][x] === 0 && !results.some(([r, c]) => r === y && c === x)) {
        temporaryResult.push([y, x]);
        results.push([y, x]);
      }
    });
  
    if (temporaryResult.length === 0) return;
    const CopyTemporaryResults = [...temporaryResult];
  
    CopyTemporaryResults.map((row: number[]) => {
      openEmptySquare(direction, row[0], row[1], results, levelInfo,  countBombBoard);
    });
  };

  export default openEmptySquare;