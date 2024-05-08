import React from 'react'
import styles from '../index.module.css';
import { clickHandler } from '../fuctions/clickHandler';


const Board = ({bombMap }) => {



  return (
  <>

      <div className={styles.board}>
        {bombMap.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={styles.cell} onClick={clickHandler} onContextMenu={()=>console.log("右クリック")}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
  </>


  )
}

export default Board
