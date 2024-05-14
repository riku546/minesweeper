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
}) => {
  const [timeCount, setTimeCount] = useState(0);
  const [bombLength, setBombLength] = useState(10);
  const results: number[][] = [];

  const clickHandler = (rowIndex: number, cellIndex: number) => {
    initializeBoard(bombMap, setBombMap);

    const newUserInputs = [...userInputs];

    if (isFirstClick === true && bombMap[rowIndex][cellIndex] === 8) {
      window.location.reload();
      return;
    } else if (isFirstClick === false && bombMap[rowIndex][cellIndex] === 8) {
      alert('fin');
      window.location.reload();
      return;
    }

    if (isFirstClick === true) {
      new Promise(() => {
        setInterval(() => {
          setTimeCount((prev) => prev + 1);
        }, 1000);
      });
    }

    if (bombMap[rowIndex][cellIndex] === 0) {
      results.push([rowIndex, cellIndex]);
      openEmptySquare(direction, rowIndex, cellIndex);
      console.log(bombMap);
      console.log(results);

      for (const count of results) {
        console.log(count)
        newUserInputs[count[0]][count[1]] = 100;
      }
      setUserInputs(newUserInputs);
    }

    setIsFirstClick(false);
    newUserInputs[rowIndex][cellIndex] = bombMap[rowIndex][cellIndex];
    setUserInputs(newUserInputs);
  };

  const openEmptySquare = (direction: number[][], rowIndex: number, cellIndex: number) => {
    const temporaryResult: number[][] = [];
    direction.map((row) => {
      const y = rowIndex + row[1];
      const x = cellIndex + row[0];

      if (x < 0 || x > 8) return;
      if (y < 0 || y > 8) return;

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

  // };

  const RightClick = (e, rowIndex: number, cellIndex: number) => {
    e.preventDefault();
    setBombLength((prev) => prev - 1);
    const newUserInputs = [...userInputs];
    newUserInputs[rowIndex][cellIndex] = 20;
    setUserInputs(newUserInputs);
  };

  return (
    <>
      <div className={styles.matchInfos}>
        <div>bomb: {bombLength}</div>
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
