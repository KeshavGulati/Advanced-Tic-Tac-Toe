import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faO } from "@fortawesome/free-solid-svg-icons";
import { useUserIcon } from "../Components/UserChoiceContext.tsx"
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Home() {
  const { iconChoice, setIconChoice } = useUserIcon();
  console.log(`icon = ${iconChoice}`);

  useEffect(() => {
    toast.info("some message")
    
  }, []);

    return (
	<div className="main-div"> 
	    <div className="icon-div">
	      <FontAwesomeIcon icon={faXmark} className="x-mark" />
	      <FontAwesomeIcon icon={faO} className="o-mark" />
	    </div>
    
	    <div className="choice-div">
	      <span className="span pick-text">Pick player 1's mark</span>
	      <div className="choice-div__icon-div">
		<div className={`icon-div__icon-div x-div ${iconChoice == "x-mark"? "active":""}`} onClick={() => setIconChoice("x-mark")}>
		  <FontAwesomeIcon icon={faXmark} className="x-mark"/>
		</div>
		<div className={`icon-div__icon-div o-div ${iconChoice == "o-mark"? "active":""}`} onClick={() => setIconChoice("o-mark")}>
		  <FontAwesomeIcon icon={faO} className="o-mark" />
		</div>
	      </div>
	      <div className={`icon-bg-div ${iconChoice == "o-mark"? "o-active": "x-active"}`}></div>
	      <span className="span remember-text">Remember: X goes first</span>
	    </div>
	    <div className="new-game-div">
        <Link to="/CpuGame" className="new-game-cpu-btn">
          New Game (vs CPU)
        </Link>
	      <a className="new-game-player-btn" href="./player-game.html">New Game (vs player)</a>
	    </div>
      </div>

    )

}

