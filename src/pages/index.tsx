import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

export const direction = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

import initializeBoard from '../fuctions/Initialize';
import openEmptySquare from '../fuctions/openEmpty';
import checkClear from '../fuctions/checkClear';

const Home = () => {
  const results: number[][] = [];
  const [timeCount, setTimeCount] = useState(0);
  const [levelInfo, setLevelInfo] = useState({
    height: 9,
    width: 9,
    NumBomb: 10,
    customMode: false,
  });
  const [isTimerActive, setIsTimerActive] = useState(false);

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

  const createBoard = (height: number, width: number) => {
    const board = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(0);
      }
      board.push(row);
    }
    const bombBoard = structuredClone(board);

    setCountBombBoard(bombBoard);
    setUserInputs(board);
  };

  //クリア判定
  useEffect(() => {
    const checkList = checkClear(countBombBoard, userInputs);

    if (checkList.length === 0) {
      const board: number[][] = structuredClone(countBombBoard);
      while (true) {
        const Rowrandom = Math.floor(Math.random() * levelInfo.height);
        const Cellrandom = Math.floor(Math.random() * levelInfo.width);
        if (countBombBoard[Rowrandom][Cellrandom] !== 11) {
          board[Rowrandom][Cellrandom] = 1000;
          break;
        }
      }

      setCountBombBoard(board);
      setIsTimerActive(false);
    }
  }, [userInputs]);

  //タイマー処理
  useEffect(() => {
    let time: NodeJS.Timeout | undefined = undefined;
    if (isTimerActive) {
      time = setInterval(() => {
        setTimeCount((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(time);
    };
  }, [isTimerActive]);

                      //クリックしたところのボードの座標(y座標 x座標)
  const clickHandler = (rowIndex: number, cellIndex: number) => {
    //計算値
    const isFirstClick = countBombBoard.flat().every((cell) => cell === 0);
    const newUserInputs = structuredClone(userInputs);
    const isGameFinish = newUserInputs.flat().some((cell) => cell === 11);
    const isCleared = countBombBoard.flat().some((cell) => cell === 1000);

    
    if (newUserInputs[rowIndex][cellIndex] === 10 || isGameFinish || isCleared) return;

    //ボードの初期化（爆弾と周りの爆弾数をセットする）
    if (isFirstClick) {
      const newBoard = initializeBoard(direction, rowIndex, cellIndex, countBombBoard, levelInfo);
      setCountBombBoard(newBoard);
    }
    //爆弾をクリックしたときの処理（ゲームオーバー時の処理）
    if (isFirstClick === false && countBombBoard[rowIndex][cellIndex] === 11) {
      countBombBoard.map((row, rowIndex) => {
        row.map((cell, cellIndex) => {
          if (cell === 11) {
            results.push([rowIndex, cellIndex]);
          }
        });
      });

      results.map((row: number[]) => {
        if (rowIndex === row[0] && cellIndex === row[1]) {
          newUserInputs[row[0]][row[1]] = 33;
        } else {
          newUserInputs[row[0]][row[1]] = 11;
        }
      });

      setUserInputs(newUserInputs);
      setIsTimerActive(false);

      return;
    }

    if (countBombBoard[rowIndex][cellIndex] === 0) {
      const tL: number[][] = [];
      results.push([rowIndex, cellIndex]);
      //再帰関数
      openEmptySquare(direction, rowIndex, cellIndex, results, levelInfo, countBombBoard);

      for (const count of results) {
        newUserInputs[count[0]][count[1]] = 100;
      }

      newUserInputs.map((row: number[], rowIndex: number) => {
        row.map((i, index) => {
          if (i === 100) {
            direction.map((row) => {
              const x = index + row[0];
              const y = rowIndex + row[1];
              if (x < 0 || x > levelInfo.width - 1) return;
              if (y < 0 || y > levelInfo.height - 1) return;

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

  const RightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rowIndex: number,
    cellIndex: number,
  ) => {
    e.preventDefault();
    const isClear = countBombBoard.flat().some((cell) => cell === 1000);

    const newUserInputs = [...userInputs];
    const isGameFinish = newUserInputs.flat().some((cell) => cell === 11);
    if (isGameFinish || isClear) return;

    if (newUserInputs[rowIndex][cellIndex] === 10) {
      newUserInputs[rowIndex][cellIndex] = 0;
    } else {
      newUserInputs[rowIndex][cellIndex] = 10;
    }

    setUserInputs(newUserInputs);
  };

  const resetState = () => {
    const board = [];
    for (let i = 0; i < levelInfo.height; i++) {
      const row = [];
      for (let j = 0; j < levelInfo.width; j++) {
        row.push(0);
      }
      board.push(row);
    }

    const newBoard = structuredClone(board);
    console.log(newBoard);
    console.log(board);

    setTimeCount(0);
    setIsTimerActive(false);

    setUserInputs(board);
    setCountBombBoard(newBoard);
  };

  return (
    <>
      <div>
        <div>
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              gap: 20,
              justifyContent: 'center',
              color: 'white',
            }}
          >
            <li
              onClick={() => {
                createBoard(9, 9),
                  setLevelInfo({ height: 9, width: 9, NumBomb: 10, customMode: false });
                setIsTimerActive(false);
                setTimeCount(0);
              }}
            >
              beginner
            </li>
            <li
              onClick={() => {
                createBoard(16, 16),
                  setLevelInfo({ height: 16, width: 16, NumBomb: 40, customMode: false });
                setIsTimerActive(false);
                setTimeCount(0);
              }}
            >
              intermediate
            </li>
            <li
              onClick={() => {
                createBoard(16, 30),
                  setLevelInfo({ height: 16, width: 30, NumBomb: 99, customMode: false });
                setIsTimerActive(false);
                setTimeCount(0);
              }}
            >
              advanced
            </li>
            <li
              onClick={() => {
                createBoard(30, 30),
                  setLevelInfo({ height: 30, width: 30, NumBomb: 80, customMode: true });
                setIsTimerActive(false);
                setTimeCount(0);
              }}
            >
              custom
            </li>
          </ul>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {levelInfo.customMode ? (
            <div style={{ display: 'flex', gap: 20 }}>
              <label htmlFor="">
                <input
                  className={styles.input}
                  type="number"
                  value={levelInfo.height}
                  onChange={(e) => {
                    setLevelInfo({ ...levelInfo, height: Number(e.target.value) });
                  }}
                />
              </label>
              <label htmlFor="">
                <input
                  className={styles.input}
                  type="number"
                  value={levelInfo.width}
                  onChange={(e) => {
                    setLevelInfo({ ...levelInfo, width: Number(e.target.value) });
                  }}
                />
              </label>
              <label htmlFor="">
                <input
                  className={styles.input}
                  type="number"
                  value={levelInfo.NumBomb}
                  onChange={(e) => {
                    setLevelInfo({ ...levelInfo, NumBomb: Number(e.target.value) });
                  }}
                />
              </label>
              <input
                className={styles.button}
                type="button"
                value="update"
                onClick={() => {
                  createBoard(levelInfo.height, levelInfo.width);
                }}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.boderStyle}>
          <div className={styles.boardStyle}>
            <div className={styles.matchInfos} style={{ color: 'white' }}>
              <div className={styles.bombCounterStyle}>
                <div className={styles.bombCounter}>
                  {levelInfo.NumBomb - userInputs.flat().filter((cell) => cell === 0).length === 0
                    ? 0
                    : countBombBoard.flat().every((cell) => cell === 0)
                      ? levelInfo.NumBomb - userInputs.flat().filter((cell) => cell === 10).length
                      : countBombBoard.flat().filter((cell) => cell === 11).length -
                        userInputs.flat().filter((cell) => cell === 10).length}
                </div>
              </div>

              <div className={styles.resetButtonStyle}>
                {countBombBoard.flat().some((cell) => cell === 1000) ? (
                  <div
                    className={styles.restartButton}
                    style={{
                      backgroundPosition: '-360px',
                    }}
                    onClick={() => resetState()}
                  />
                ) : (
                  <div
                    className={styles.restartButton}
                    style={{
                      backgroundPosition: !userInputs.flat().some((cell) => cell === 11)
                        ? '-330px'
                        : `-390px`,
                    }}
                    onClick={() => resetState()}
                  />
                )}
              </div>
              <div className={styles.timeCountStyle}>
                <div className={styles.timeCount}> {timeCount}</div>
              </div>
            </div>
            <div className={styles.board}>
              {userInputs.map((row: number[], rowIndex: number) => (
                <div key={rowIndex} className={styles.row}>
                  {row.map((cell: number, cellIndex: number) =>
                    cell === 33 ? (
                      <div
                        style={{ backgroundColor: 'red', backgroundPosition: '-300px , 0px' }}
                        className={styles.imageStyle}
                      />
                    ) : (
                      <div
                        key={rowIndex - cellIndex}
                        className={styles.cell}
                        onClick={() => clickHandler(rowIndex, cellIndex)}
                        onContextMenu={(e) => RightClick(e, rowIndex, cellIndex)}
                        onMouseDown={() => {
                          countBombBoard.flat().every((cell) => cell === 0)
                            ? setIsTimerActive(true)
                            : '';
                        }}
                        style={{
                          borderColor: cell === 0 ? '#fff #7f7f7f #7f7f7f #fff' : '',
                          borderWidth: cell === 0 ? 4 : '1.5px',
                          backgroundPosition:
                            levelInfo.NumBomb -
                              userInputs.flat().filter((cell) => cell === 0).length ===
                              0 && countBombBoard[rowIndex][cellIndex] === 11
                              ? '-270px'
                              : '30px',
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
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
