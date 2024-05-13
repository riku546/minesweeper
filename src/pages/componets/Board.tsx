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
      const result = openEmptySquare(direction, rowIndex, cellIndex);
      console.log(bombMap)
      console.log(result);
    }

    setIsFirstClick(false);
    newUserInputs[rowIndex][cellIndex] = bombMap[rowIndex][cellIndex];
    setUserInputs(newUserInputs);
  };

  const openEmptySquare = (direction: number[][], rowIndex: number, cellIndex: number) => {
    const results: number[][] = []

    const checkEmptySquare = () =>{

      const temporaryResult: number[][] = [];
      direction.map((row) => {
        const y = rowIndex + row[1];
        const x = cellIndex + row[0];

        if (x < 0 || x > 8) return;
        if (y < 0 || y > 8) return;

        if (bombMap[x][y] === 0) {
          temporaryResult.push([y, x]);

        }
      });
      return temporaryResult
    }

    while (true){
      const result = checkEmptySquare()
      
    }






  };

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
