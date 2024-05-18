import React, { useState } from 'react';
import styles from '../index.module.css';
import { initializeBoard } from '../fuctions/Initialize';
const Board = ({ bombMap,setBombMap, isFirstClick, setIsFirstClick, userInputs, setUserInputs }) => {
  const [timeCount, setTimeCount] = useState(0);
  const [bombLength , setBombLength] = useState(10)


  const clickHandler = (rowIndex: number, cellIndex: number) => {
    const newUserInputs = [...userInputs];

    if (isFirstClick === true && bombMap[rowIndex][cellIndex] === 8) {
      window.location.reload();
      initializeBoard(bombMap , setBombMap)
      return;
    } else if (isFirstClick === false && bombMap[rowIndex][cellIndex] === 8) {
      alert('fin');
      window.location.reload();
      return;
    }

    if (isFirstClick === true) {
      initializeBoard(bombMap , setBombMap)
      new Promise(() => {
        setInterval(() => {
          setTimeCount((prev) => prev + 1);
        }, 1000);
      });
    }


    setIsFirstClick(false);
    newUserInputs[rowIndex][cellIndex] = bombMap[rowIndex][cellIndex];
    setUserInputs(newUserInputs);
  };



  const RightClick = (e , rowIndex :number, cellIndex:number) => {
    e.preventDefault();
    setBombLength(prev => prev - 1)
    const newUserInputs = [...userInputs]
    newUserInputs[rowIndex][cellIndex] = 20
    setUserInputs(newUserInputs)

  };

  return (
    <>
      <div className={styles.matchInfos}>
        <div>bomb:  {bombLength}</div>
        <button onClick={() => window.location.reload()}>reset</button>
        <div>time:  {timeCount}</div>
      </div>
      <div className={styles.board}>
        {userInputs.map((row: number[], rowIndex: number) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, cellIndex) => (
              <div
                key={rowIndex - cellIndex}
                className={styles.cell}
                onClick={() => clickHandler(rowIndex, cellIndex)}
                onContextMenu={(e) => RightClick(e , rowIndex , cellIndex)}
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
