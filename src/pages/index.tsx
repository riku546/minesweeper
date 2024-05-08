import { useEffect, useState } from 'react';
import styles from './index.module.css';
import Board from './componets/Board';
import MatchInfo from './componets/MatchInfo';
import { bombCount } from './fuctions/bombCount';
import { initializeBoard } from './fuctions/Initialize';

const Home = () => {
  const [isFirstClick , setIsFirstClick] = useState(false)
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


  useEffect(() => {
    // const upDateBombBoard = [...bombMap]

    // const newBombBoard = initializeBoard(bombMap);
    // const bombLength = bombCount(newBombBoard);

    // bombLength.map((row, rowIndex) => {
    //   row.map((cell, cellIndex) => {
    //     if (cell === 0) return;
    //     upDateBombBoard[rowIndex][cellIndex] = cell;
    //   });
    // });

    // setBombMap(upDateBombBoard)

  }, []);

 const clickHandler = (rowIndex:number ,cellIndex:number ) =>{
    if(isFirstClick === true || bombMap[rowIndex][cellIndex] === 8){
      return



    }else if(isFirstClick === false || bombMap[rowIndex][cellIndex] === 8){
      return
    }
  }


  return (
    <div className={styles.container}>
      <MatchInfo />
      <Board bombMap={bombMap} isFirstClick={isFirstClick}  setIsFirstClick={setIsFirstClick} />
    </div>
  );
};

export default Home;
