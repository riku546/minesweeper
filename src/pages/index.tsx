import { useState, useEffect } from 'react';
import styles from './index.module.css';
import { direction } from './direction';

const initializeBoard = (
  rowIndex: number,
  cellIndex: number,
  countBombBoard: number[][],
  levels,
  levelsRowIndex: number,
) => {
  const newCountBombBoard = [...countBombBoard];
  const Nums: number[][] = [];

  while (Nums.length < levels[levelsRowIndex].bombLength) {
    const Rowrandom = Math.floor(Math.random() * levels[levelsRowIndex].rowLength);
    const Cellrandom = Math.floor(Math.random() * levels[levelsRowIndex].columnLength);
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

  return newCountBombBoard;
};

const Home = () => {
  // const [isFirstClick, setIsFirstClick] = useState(true);
  const levels = [
    { name: 'beginner', level: '1', bombLength: 10, rowLength: 9, columnLength: 9 },
    { name: 'intermediate', level: '2', bombLength: 40, rowLength: 16, columnLength: 16 },
    { name: 'advanced', level: '3', bombLength: 99, rowLength: 16, columnLength: 30 },
    { name: 'custome', level: 'custome', bombLength: 0, rowLength: 30, columnLength: 30 },
  ];
  const results: number[][] = [];
  const [timeCount, setTimeCount] = useState(0);
  const [bombLength, setBombLength] = useState(10);

  const [levelsRowIndex, setLevelsRowIndex] = useState(0);
  const initBoard = [
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

  const [userInputs, setUserInputs] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [countBombBoard, setCountBombBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const createBoard = (rowIndex: number) => {
    const boards = [];
    const board = [];
    for (let cell = 0; cell < levels[rowIndex].columnLength; cell++) {
      board.push(0);
    }
    for (let cell = 0; cell < levels[rowIndex].rowLength; cell++) {
      boards.push(board);
    }
    setUserInputs(boards);
  };

  const time = () => {

      new Promise(() => {
        setInterval(() => {
          setTimeCount((prev) => prev + 1);
        }, 1000);
      });

  };

  useEffect(() => {
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
    if (checkList.length === 0) {
      alert('finish');
    }
  }, [userInputs]);

  const clickHandler = (rowIndex: number, cellIndex: number) => {
    const isFirstClick = countBombBoard.flat().every((cell) => cell === 0);

    if (isFirstClick === true) {
      console.log('s');
      const newBoard = initializeBoard(rowIndex, cellIndex, countBombBoard, levels, levelsRowIndex);
      setCountBombBoard(newBoard);
    }

    const newUserInputs = [...userInputs];

    if (isFirstClick === false && countBombBoard[rowIndex][cellIndex] === 11) {
      alert('fin');
    }

    if (countBombBoard[rowIndex][cellIndex] === 0) {
      const tL = [];
      results.push([rowIndex, cellIndex]);
      //再帰関数
      openEmptySquare(direction, rowIndex, cellIndex);

      for (const count of results) {
        newUserInputs[count[0]][count[1]] = 100;
      }

      newUserInputs.map((row: number[], rowIndex: number) => {
        row.map((i, index) => {
          if (i === 100) {
            direction.map((row) => {
              const x = index + row[0];
              const y = rowIndex + row[1];
              if (x < 0 || x > levels[levelsRowIndex].columnLength - 1) return;
              if (y < 0 || y > levels[levelsRowIndex].rowLength - 1) return;

              if (countBombBoard[y][x] === 11 || countBombBoard[y][x] === 0) {
                return;
              }
              tL.push([y, x]);
            });
          }
        });
      });

      for (const t of tL) {
        if (newUserInputs[t[0]][t[1]] === 100) break;
        newUserInputs[t[0]][t[1]] = countBombBoard[t[0]][t[1]];
      }
    } else {
      newUserInputs[rowIndex][cellIndex] = countBombBoard[rowIndex][cellIndex];
    }

    setUserInputs(newUserInputs);
  };

  const openEmptySquare = (direction: number[][], rowIndex: number, cellIndex: number) => {
    const temporaryResult: number[][] = [];
    direction.map((row) => {
      const y = rowIndex + row[1];
      const x = cellIndex + row[0];

      if (x < 0 || x > levels[levelsRowIndex].columnLength - 1) return;
      if (y < 0 || y > levels[levelsRowIndex].rowLength - 1) return;

      if (countBombBoard[y][x] === 0 && !results.some(([r, c]) => r === y && c === x)) {
        temporaryResult.push([y, x]);
        results.push([y, x]);
      }
    });

    if (temporaryResult.length === 0) return;
    const CopyTemporaryResults = [...temporaryResult];

    CopyTemporaryResults.map((row: number[]) => {
      openEmptySquare(direction, row[0], row[1]);
    });
  };

  const RightClick = (e, rowIndex: number, cellIndex: number) => {
    e.preventDefault();

    let count = 0;
    const newUserInputs = [...userInputs];
    if (newUserInputs[rowIndex][cellIndex] === 10) {
      newUserInputs[rowIndex][cellIndex] = 0;
    } else {
      newUserInputs[rowIndex][cellIndex] = 10;
    }

    setUserInputs(newUserInputs);
    for (const row of newUserInputs) {
      for (const cell of row) {
        if (cell === 10) {
          count++;
        }
      }
    }
    setBombLength(10 - count);
  };

  const resetState = () => {
    const newInitBoard = structuredClone(initBoard)
    setTimeCount(0);
    setBombLength(10);
    setUserInputs(initBoard);
    setCountBombBoard(newInitBoard);
  };

  return (
    <>
      <div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
          {levels.map((row, rowIndex) => {
            return (
              <p onClick={() => createBoard(rowIndex)} key={row.name}>
                {row.name}
              </p>
            );
          })}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.matchInfos}>
          <div>bomb: {bombLength}</div>
          <div
            className={styles.restartButton}
            style={{ backgroundPosition: '-330px' }}
            onClick={resetState}
          />
          <div>time: {timeCount}</div>
        </div>
        <div className={styles.board}>
          {userInputs.map((row: number[], rowIndex: number) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell: number, cellIndex: number) => (
                <div
                  key={rowIndex - cellIndex}
                  className={styles.cell}
                  onClick={() => clickHandler(rowIndex, cellIndex)}
                  onContextMenu={(e) => RightClick(e, rowIndex, cellIndex)}
                  onMouseDown={()=> { countBombBoard.flat().every(cell => cell === 0) ? time() : ""}}
                  style={{
                    borderColor: cell === 0 ? '#fff #7f7f7f #7f7f7f #fff' : '',
                    borderWidth: cell === 0 ? 4 : '1.5px',
                    backgroundColor: cell === 11 ? 'red' : '',
                  }}
                >
                  {
                    <div
                      className={styles.imageStyle}
                      style={{
                        visibility: cell === 0 ? 'hidden' : 'visible',
                        backgroundPosition:
                          cell === 0 ? `-1000px -1000px ` : `${-30 * (cell - 1)}px ,0px `,
                      }}
                    />
                  }
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
