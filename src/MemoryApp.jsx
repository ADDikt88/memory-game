import { useState, useEffect } from "react";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import "./MemoryApp.css";
import "./Card.css";
import CardGrid from "./Card.jsx";
//import { ChampionContext } from "./RiotChamps.jsx";

//const size = 9;
function MemoryApp({ selectedChampions, version, onReselect, size }) {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [cardClicked, setCardClicked] = useState(-99);
  const [cardClickedList, setCardClickedList] = useState([]);
  //const [cardList, setCardList] = useState(selectedChampions);

  function initializeCardList(size) {
    const cardList = [];
    for (let i = 0; i < size; i++) {
      const card = {
        src: "",
        label: i,
      };
      cardList.push(card);
    }
    return shuffle(cardList);
  }

  function checkCardList(cardClicked, cardClickedList) {
    for (let j = 0; j < cardClickedList.length; j++) {
      if (cardClickedList[j].label == cardClicked.label) {
        return true;
      }
    }
    return false;
  }

  function handleCardClick(index) {
    console.log("You clicked: " + selectedChampions[index].label);

    // //Store the previously clicked card
    // setCardClicked(selectedChampions[index].label);
    // console.log(cardClicked);

    //Store the previously clicked card in a new list
    const newCardClickedList = cardClickedList;

    //Check if the card had been previously clicked
    if (checkCardList(selectedChampions[index], newCardClickedList)) {
      //trigger end
      setScore(0);
      setCardClicked(-2);
      setCardClickedList([]);
      onReselect();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (score == size - 1) {
      setScore(size);
      setBestScore(size);
      setCardClicked(-3);
      setCardClickedList([]);
      onReselect();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      score == size ? setScore(1) : setScore((score) => score + 1);
      newCardClickedList.push(selectedChampions[index]);
      setCardClickedList(newCardClickedList);
      setCardClicked(-99);
    }
    //setCardList(shuffle(selectedChampions));
  }

  return (
    <>
      <h1>{"Snowy's Memory Game"}</h1>
      <div className="score-table">
        <p>Score: {score}</p>
        <p>Best Score: {score > bestScore ? setBestScore(score) : bestScore}</p>
      </div>
      <p className="rules">
        {
          "Get points by clicking on an image but don't click on any more than once!"
        }
      </p>
      <p className="game-over-display">
        {cardClicked > -99 &&
          (cardClicked == -2
            ? "Game Over. You've already clicked that champion. Play again!"
            : "You Win! You have a great memory! Play again!")}
      </p>
      <CardGrid
        cardList={selectedChampions}
        handleCardClick={handleCardClick}
      />
    </>
  );
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export default MemoryApp;
