import { useState } from 'react';
import styles from './index.module.css';
import Board from './componets/Board';

const Home = () => {
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [levels, setLevels] = useState([
    { name: '初級', level: '1', bombLength: 10, rowLength: 9, columnLength: 9 },
    { name: '中級', level: '2', bombLength: 40, rowLength: 16, columnLength: 16 },
    { name: '上級', level: '3', bombLength: 99, rowLength: 16, columnLength: 30 },
    { name: 'カスタム', level: 'custome', bombLength: 0, rowLength: 30, columnLength: 30 },
  ]);

  const [bombMap, setBombMap] = useState([
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

  const board: number[][] = [];

  const createBoard = (rowIndex) =>{
    const boards =[]
    const board = []
    for (let i = 0 ; i < levels[rowIndex].columnLength  ; i++){
      board.push(0)
    }

    for (let i = 0; i < levels[rowIndex].rowLength ; i++){
      boards.push(board)
    }
    console.log(boards)
    setBombMap(boards)
    setUserInputs(boards)

  }


  const changeLevel = (rowIndex:number) =>{
    console.log(levels[rowIndex])
    createBoard(rowIndex)
  }

  return (
    <>
      <div>
        <div style={{ display: 'flex', gap:20 , justifyContent:"center" }}>
          {levels.map((row ,rowIndex) => {
            return (
              <p onClick={() => changeLevel(rowIndex)} key={row.name} >
                {row.name}
              </p>
            );
          })}
        </div>
      </div>
      <div className={styles.container}>
        <Board
          bombMap={bombMap}
          setBombMap={setBombMap}
          isFirstClick={isFirstClick}
          setIsFirstClick={setIsFirstClick}
          userInputs={userInputs}
          setUserInputs={setUserInputs}
        />
      </div>
    </>
  );
};

export default Home;
