import React, { useEffect ,useState } from 'react';
import styles from '../index.module.css';
import { direction } from '../direction';
import { levelsObject } from '../boards';

import { initializeBoard } from '../fuctions/Initialize';
const Board = ({
  bombMap,
  setBombMap,
  isFirstClick,
  setIsFirstClick,
  userInputs,
  setUserInputs,
  levels,
  countBombBoard,
  levelsRowIndex,
  setCountBombBoard,
  setLevelsRowIndex

}) => {

  const [timeCount, setTimeCount] = useState(0);
  const [bombLength, setBombLength] = useState(10);


  const results: number[][] = [];

  const timer = () => {
    if (isFirstClick === true) {
      new Promise(() => {
        setInterval(() => {
          setTimeCount((prev) => prev + 1);
        }, 1000);
      });
    }
  };



  useEffect(() => {
    const bombPostionList: number[][] = [];
    const checkList: number[] = [];
    bombMap.map((row: number[], rowIndex: number) => {
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
    console.log(bombMap)
    if (isFirstClick === true) {
      initializeBoard(
        bombMap,
        setBombMap,
        userInputs,
        setUserInputs,
        isFirstClick,
        levels,
        countBombBoard,
        levelsRowIndex,
        rowIndex,
        cellIndex,
      );
    }

    const newUserInputs = [...userInputs];


    if (isFirstClick === false && bombMap[rowIndex][cellIndex] === 11) {
      bombMap.map((row:number[] , rowIndex:number)=>{
        row.map((cell , cellIndex)=>{
          if(cell === 11){
            newUserInputs[rowIndex][cellIndex] =11
          }
        })
      })
      setUserInputs(newUserInputs)

      return;
    }

    setIsFirstClick(false);

    if (bombMap[rowIndex][cellIndex] === 0) {
      results.push([rowIndex, cellIndex]);
      openEmptySquare(direction, rowIndex, cellIndex);

      const tL:number[][] = [];
      for (const count of results) {
        newUserInputs[count[0]][count[1]] = 100;
      }
      newUserInputs.map((row:number[], rowIndex:number) => {
        row.map((i, index) => {
          if (i === 100) {
            direction.map((row) => {
              const x = index + row[0];
              const y = rowIndex + row[1];
              if (x < 0 || x > levels[levelsRowIndex].columnLength - 1) return;
              if (y < 0 || y > levels[levelsRowIndex].rowLength - 1) return;

              if (bombMap[y][x] === 11 || bombMap[y][x] === 0) {
                return;
              }
              tL.push([y, x]);
            });
          }
        });
      });

      for (const t of tL) {
        if (newUserInputs[t[0]][t[1]] === 100) break;
        newUserInputs[t[0]][t[1]] = bombMap[t[0]][t[1]];
      }

      setUserInputs(newUserInputs);
      return;
    }

    newUserInputs[rowIndex][cellIndex] = bombMap[rowIndex][cellIndex];
    setUserInputs(newUserInputs);
  };

  const openEmptySquare = (direction: number[][], rowIndex: number, cellIndex: number) => {
    const temporaryResult: number[][] = [];
    direction.map((row) => {
      const y = rowIndex + row[1];
      const x = cellIndex + row[0];

      if (x < 0 || x > levels[levelsRowIndex].columnLength - 1) return;
      if (y < 0 || y > levels[levelsRowIndex].rowLength - 1) return;

      if (bombMap[y][x] === 0 && !results.some(([r, c]) => r === y && c === x)) {
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
    console.log(isFirstClick);
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

  const resetState = () =>{
    setIsFirstClick(true)
    setTimeCount(0)
    setLevelsRowIndex(0)
    setBombLength(10)
    setBombMap(levelsObject[0][0])
    setUserInputs(levelsObject[0][1])
    setCountBombBoard(levelsObject[0][2])
  }

  return (
    <>
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
                onMouseDown={() => timer()}
                style={{
                  borderColor: cell === 0 ? '#fff #7f7f7f #7f7f7f #fff' : '',
                  borderWidth: cell === 0 ? 4 : '1.5px',
                  backgroundColor : cell === 11 ? "red" : ""
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
    </>
  );
};

export default Board;
