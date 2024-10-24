import { useState, useEffect } from "react";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import "./MemoryApp.css";
import "./Card.css";
import CardGrid from "./Card.jsx";
//import { ChampionContext } from "./RiotChamps.jsx";

const size = 10;

function MemoryApp({ champions, version }) {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [cardClicked, setCardClicked] = useState(-99);
  const [cardClickedList, setCardClickedList] = useState([]);
  const [cardList, setCardList] = useState(initializeChampList(size));

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

  function initializeChampList(size) {
    const champList = shuffle(champions).slice(0, size);
    const champImgList = [];
    champList.forEach((champion) => {
      const imgChamp = {
        src: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`,
        label: champion.name,
      };
      champImgList.push(imgChamp);
    });
    return shuffle(champImgList);
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
    console.log("You clicked: " + cardList[index].label);

    //Store the previously clicked card
    setCardClicked(cardList[index].label);

    //Store the previously clicked card in a new list
    const newCardClickedList = cardClickedList;

    //Check if the card had been previously clicked
    if (checkCardList(cardList[index], newCardClickedList)) {
      //trigger end
      setScore(0);
      setCardClicked(-2);
      setCardClickedList([]);
      //initializeChampList(size);
    } else if (score == 9) {
      setScore(10);
      setBestScore(10);
      setCardClicked(-3);
      setCardClickedList([]);
      //initializeChampList(size);
    } else {
      score == 10 ? setScore(1) : setScore((score) => score + 1);
      newCardClickedList.push(cardList[index]);
      setCardClickedList(newCardClickedList);
    }
    setCardList(shuffle(cardList));
  }

  return (
    <>
      <h1>{"Snowy's Memory Game"}</h1>
      <div className="card">
        <p>Score: {score}</p>
        <p>Best Score: {score > bestScore ? setBestScore(score) : bestScore}</p>
      </div>
      <p className="rules">
        {
          "Get points by clicking on an image but don't click on any more than once!"
        }
      </p>
      <CardGrid cardList={cardList} handleCardClick={handleCardClick} />
      <p>
        {cardClicked > -99 &&
          (cardClicked > -1
            ? "You previously clicked: " + cardClicked
            : cardClicked == -2
            ? "Game Over. You've already clicked that number. Play again!"
            : "You Win! You have a great memory! Play again!")}
      </p>
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
