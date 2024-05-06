import React from 'react'
import styles from '../index.module.css';


const Board = ({bombMap , clickHandler}) => {




  return (
  <>
      {/* <div className={styles.sampleStyle} style={{backgroundPosition:`${-30 * samplePos}px 0px`}}>
        <button onClick={()=>setSamplePos(p => (p + 1) % 14)} style={{width:40, height:10}}/>
      </div> */}
      <div className={styles.board}>
        {bombMap.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={styles.cell} onClick={clickHandler}>
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
