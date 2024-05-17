import React, { useState } from 'react';
import styles from '../index.module.css';
import { direction } from '../direction';

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

  const clickHandler = (rowIndex: number, cellIndex: number) => {
    console.log()
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
      );
    }

    const newUserInputs = [...userInputs];


    if (isFirstClick === true && bombMap[rowIndex][cellIndex] === 8) {
      window.location.reload();
      return;
    } else if (isFirstClick === false && bombMap[rowIndex][cellIndex] === 8) {
      alert('fin');
      window.location.reload();
      return;
    }

    setIsFirstClick(false);

    if (bombMap[rowIndex][cellIndex] === 0) {
      results.push([rowIndex, cellIndex]);
      openEmptySquare(direction, rowIndex, cellIndex);

      const tL = [];
      for (const count of results) {
        newUserInputs[count[0]][count[1]] = 100;
      }
      newUserInputs.map((row, rowIndex) => {
        row.map((i, index) => {
          if (i === 100) {
            direction.map((row) => {
              const x = index + row[0];
              const y = rowIndex + row[1];
              if (x < 0 || x > levels[levelsRowIndex].columnLength -1) return;
              if (y < 0 || y > levels[levelsRowIndex].rowLength -1) return;

              if (bombMap[y][x] === 8 || bombMap[y][x] === 0) {
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

      if (x < 0 || x > levels[levelsRowIndex].columnLength -1) return;
      if (y < 0 || y > levels[levelsRowIndex].rowLength -1) return;

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
    console.log(isFirstClick)
    let count = 0
    const newUserInputs = [...userInputs];
    if(newUserInputs[rowIndex][cellIndex] === 20){
      newUserInputs[rowIndex][cellIndex] = 0
    }else{
      newUserInputs[rowIndex][cellIndex] = 20;

    }

    setUserInputs(newUserInputs);
    for (const row of newUserInputs){
      for(const cell of row){
        if(cell === 20){
          count++
        }
      }
    }
    setBombLength(10 - count)
  };

  return (
    <>
      <div className={styles.matchInfos}>
        <div>bomb: {bombLength}</div>
        <div
          className={styles.restartButton}
          style={{ backgroundPosition: '-330px' }}
          onClick={() => window.location.reload()}
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
              >
                {<div>{cell !== 0 && cell}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
