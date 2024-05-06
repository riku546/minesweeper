import { useState } from 'react';
import styles from './index.module.css';
import Board from './componets/Board';
import MatchInfo from './componets/MatchInfo';
import { bombCount } from './fuctions/bombCount';

const Home = () => {
  const [samplePos, setSamplePos] = useState(0);
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

  const clickHandler = () => {
    const newBombBoard = [...bombMap];
    const Nums = [];

    for (let i = 0; i < 10; i++) {
      const Rowrandom = Math.floor(Math.random() * 9);
      const Cellrandom = Math.floor(Math.random() * 9);
      Nums.push([Rowrandom, Cellrandom]);
    }
    Nums.map((row) => {
      newBombBoard[row[0]][row[1]] = 8;
    });

    const bombLength = bombCount(newBombBoard);
    bombLength.map((row , rowIndex)=>{
      row.map((cell , cellIndex)=>{
        if(cell === 0)return;
        newBombBoard[rowIndex][cellIndex] = cell

      })
    })
    




    setBombMap(newBombBoard);
  };

  return (
    <div className={styles.container}>
      <MatchInfo />
      <Board bombMap={bombMap} clickHandler={clickHandler} />
    </div>
  );
};

export default Home;
