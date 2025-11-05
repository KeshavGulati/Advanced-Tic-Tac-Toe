import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faO, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useUserIcon } from "../Components/UserChoiceContext.tsx"
import './game.css';

const CpuGame: React.FC = () => {

  const { iconChoice } = useUserIcon();
  const [currMove, setCurrMove] = useState<string>(iconChoice == "x-mark"? "user": "cpu");
  const userIcon = iconChoice == "x-mark"? 
                    <FontAwesomeIcon icon={faXmark} className="x-mark" /> : <FontAwesomeIcon icon={faO} className="o-mark" />;
  const cpuIcon = iconChoice == "o-mark"? 
                    <FontAwesomeIcon icon={faXmark} className="x-mark" /> : <FontAwesomeIcon icon={faO} className="o-mark" />;
  
  // The board represents the current state of the board. An index 'i' in the array
  // corresponds to cell i+1, and each index could have one of three values:
  // 1- user move, 0- cpu move, and null means the cell is empty.
  const [board, setBoard] = useState<(number | null)[]>(Array(9).fill(null));

  const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));
  const [gameOverFlag, setGameOverFlag] = useState<boolean>(false);
  const [xWin, setXWin] = useState<boolean>(false);
  const [oWin, setOWin] = useState<boolean>(false);
  const [tied, setTied] = useState<boolean>(false);
  const [numXWins, setNumXWins] = useState<number>(0);
  const [numOWins, setNumOWins] = useState<number>(0);
  const [numTies, setNumTies] = useState<number>(0);
  const isFirstRender = useRef(true);
  const isFirstRender2 = useRef(true);
  const isFirstRender3 = useRef(true);

  const handleUserMove = async (boxIndex: number) => {
    if (board[boxIndex] != null || currMove != "user" || gameOverFlag) {
      return;

    }
    
    setBoard((currBoard) => {
      let newBoard = [...currBoard];
      newBoard[boxIndex] = 0;
      return newBoard;

    })

    if (checkWinner()) return;
    setCurrMove("cpu");

  }

  const handleCPUMove = async () => {
    if (checkWinner()) return;
    await sleep(3000);
    let temp = board.map((cell, i) => (cell == null ? i : null)).filter(i => i != null) as number[];
    console.log(`temp = ${temp}`);
    let a = 0;
    let b = temp.length - 1;
    let randIndex = Math.floor(Math.random() * (b - a + 1)) + a;
    setBoard((currBoard) => {
      let newBoard = [...currBoard];
      newBoard[temp[randIndex]] = 1;
      return newBoard;

    })

    setCurrMove("user");

  }

  const checkWinner = () => {
    // console.log("in checkWinner");
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
    
    for (let [a, b, c] of winningCombos) {
      if (board[a] != null && board[a] === board[b] && board[b] === board[c]) {
        setGameOverFlag(true);
        if (board[a] === 0) {
          if (iconChoice == "x-mark") {
            setXWin(true);

          } else {
            setOWin(true);

          }

        } else {
          if (iconChoice == "o-mark") {
            setXWin(true);

          } else {
            setOWin(true);

          }

        }

        return true;

      }

    }

    if (board.every(cell => cell != null)) {
      setGameOverFlag(true);
      setTied(true);
      return true;

    }

    return false;

  }

  useEffect(() => {
    if (isFirstRender2.current) {
      isFirstRender2.current = false;
      return;

    }

    if (isFirstRender3.current) {
      isFirstRender3.current = false;
      return;

    }

    if (gameOverFlag == true) return;

    if (xWin) {
      setNumXWins(prev => prev + 1);
      setXWin(false);

    }

    if (oWin) {
      setNumOWins(prev => prev + 1);
      setOWin(false);

    }
    
    if (tied) {
      setNumTies(prev => prev + 1);
      setTied(false);

    }
    
    setBoard(Array(9).fill(null));
    if (currMove == "cpu") setCurrMove("user"); else setCurrMove("cpu");
    // if (currMove == "cpu") handleCPUMove();
    console.log(`in gameOverFlag useEffect, currMove = ${currMove}`);

  }, [gameOverFlag])

  useEffect(() => {checkWinner()}, [board])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;

    }

    if (currMove == "cpu") handleCPUMove();

  }, [currMove])

  return (
    <>
    <div className="main-container">
      <div className="main-container__div icon-div-2">
          <FontAwesomeIcon icon={faXmark} className="x-mark" />
          <FontAwesomeIcon icon={faO} className="o-mark" />
      </div>
      <div className="main-container__div turn-div">
          {currMove == "user" ? userIcon : cpuIcon}
          {/* <FontAwesomeIcon icon={faXmark} className="x-mark" /> */}
          <b>Turn</b>
      </div>
      <div className="main-container__div restart-div restart-btn" id="restart-btn">
          <div className="restart-div__arrow-div restart-btn">
              {/* <i className="arrow-icon fa-solid fa-arrow-rotate-right restart-btn"></i> */}
              <FontAwesomeIcon icon={faArrowRotateRight} />
          </div>
      </div>
      <div className="main-container__div boxes-parent">
        {board.map((cell, i) => (
          <div 
            key={i} 
            className={`main-container__div box-div box-${i + 1}`}
            onClick={() => handleUserMove(i)}
          >
            {cell === 0 && userIcon}
            {cell === 1 && cpuIcon}
          </div>
        ))}
      </div>
      <div className="main-container__div you-score-div">
          <p>X<span className="x-player">{`${iconChoice == "x-mark"? " (You)" : " (CPU)"}`}</span></p>
          <span className="x-score">{numXWins}</span>
      </div>
      <div className="main-container__div ties-div">
          <p>Ties</p>
          <span className="ties">{numTies}</span>
      </div>
      <div className="main-container__div cpu-score-div">
          <p>O<span className="o-player">{`${iconChoice == "x-mark"? " (CPU)" : " (You)"}`}</span></p>
          <span className="o-score">{numOWins}</span>
      </div>
    </div>
    <div className={`o-win-div ${oWin? 'show' : ''}`}>
    <span className="o-win-text color-silver"></span>
     <h1 className="flex items-center content-center">
        <FontAwesomeIcon icon={faO} />
        <span>TAKES THE ROUND</span>
     </h1>
     <div className="win-btn-div flex">
       <Link to="/" className="quit-btn">QUIT</Link>
       <div className="next-round-btn" onClick={() => setGameOverFlag(false)}>NEXT ROUND</div>
     </div>
   </div>
   <div className={`x-win-div ${xWin? 'show' : ''}`}>
     <span className="x-win-text color-silver">YOU WIN</span>
       <h1 className="flex items-center content-center">
        <FontAwesomeIcon icon={faXmark} />
        <span>TAKES THE ROUND</span>
       </h1>
       <div className="win-btn-div flex">
        <Link to="/" className="quit-btn">QUIT</Link>
        <div className="next-round-btn" onClick={() => setGameOverFlag(false)}>NEXT ROUND</div>
       </div>
   </div>
   <div className={`tied-div ${tied? 'show' : ''}`}>
     <h1 className="color-silver">ROUND TIED</h1>
     <div className="win-btn-div flex">
        <Link to="/" className="quit-btn">QUIT</Link>
        <div className="next-round-btn" onClick={() => setGameOverFlag(false)}>NEXT ROUND</div>
     </div>
   </div>
   </>

  )

}

export default CpuGame;
