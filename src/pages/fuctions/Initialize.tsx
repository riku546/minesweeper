export const initializeBoard = (bombMap) => {
  console.log(bombMap)
  const newBombBoard = [...bombMap];
  const Nums = [];

  for (let i = 0; i < 10; i++) {
    const Rowrandom = Math.floor(Math.random() * 9);
    const Cellrandom = Math.floor(Math.random() * 9);
    Nums.push([Rowrandom, Cellrandom]);
  }
  console.log(Nums)
  Nums.map((row) => {
    newBombBoard[row[0]][row[1]] = 8;
  });
  // console.log(newBombBoard)
  return newBombBoard


};
