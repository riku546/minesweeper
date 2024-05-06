import { useState } from 'react';
import styles from './index.module.css';
import Board from './componets/Board';
import MatchInfo from './componets/MatchInfo';

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
  const [userInputs, setUserInputs] = useState([]);
  const board: number[][] = [];
  console.log(samplePos);

  const clickHandler = () =>{
    const newBoard = [...bombMap]
    const Nums =[]

    for(let i = 0 ; i < 10 ; i++){
      const Rowrandom = Math.floor((Math.random() * 9 ) )
      const Cellrandom = Math.floor((Math.random() * 9))
      Nums.push([Rowrandom , Cellrandom])
    }
    console.log(Nums)
    Nums.map((row)=>{
      newBoard[row[0]][row[1]] = 1
    })

    console.log(newBoard)
    setBombMap(newBoard)
  }

  return (
    <div className={styles.container}>
    <MatchInfo />
    <Board bombMap={bombMap} clickHandler={clickHandler}/>
    </div>
  );
};

export default Home;
