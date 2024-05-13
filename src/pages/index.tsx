import { useEffect, useState } from 'react';
import styles from './index.module.css';
import Board from './componets/Board';
import { initializeBoard } from './fuctions/Initialize';

const Home = () => {
  const [isFirstClick , setIsFirstClick] = useState(true)
  const initBombBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
  const [bombMap, setBombMap] = useState(initBombBoard);

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


  // useEffect(() => {

  //   setIsFirstClick(true)

  //   return () =>{
  //     setIsFirstClick(false)
  //     // setBombMap(initBombBoard)

  //   }


  // }, []);




  return (
    <div className={styles.container}>

      <Board bombMap={bombMap} setBombMap={setBombMap} isFirstClick={isFirstClick}  setIsFirstClick={setIsFirstClick} userInputs={userInputs} setUserInputs={setUserInputs} />
    </div>
  );
};

export default Home;
