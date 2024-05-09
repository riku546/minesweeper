import React from 'react';
import styles from '../index.module.css';
import { clickHandler } from '../fuctions/clickHandler';

const Board = ({ bombMap, isFirstClick, setIsFirstClick, userInputs, setUserInputs }) => {
  const clickHandler = (rowIndex: number, cellIndex: number) => {
    const newUserInputs = [...userInputs];
    console.log(newUserInputs);
    console.log(bombMap);

    if (isFirstClick === true && bombMap[rowIndex][cellIndex] === 8) {
      return;
    } else if (isFirstClick === false && bombMap[rowIndex][cellIndex] === 8) {
      alert('fin');
    }
    setIsFirstClick(false);
    newUserInputs[rowIndex][cellIndex] = bombMap[rowIndex][cellIndex];
    setUserInputs(newUserInputs);
  };

  return (
    <>
      <div className={styles.board}>
        {userInputs.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, cellIndex) => (
              <div
                key={rowIndex - cellIndex}
                className={styles.cell}
                onClick={() => clickHandler(rowIndex, cellIndex)}
                onContextMenu={() => console.log('右クリック')}
              >
                { <div>{cell !== 0 && cell}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
