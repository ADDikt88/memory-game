import { useState, useEffect } from "react";

function CardGrid({ cardList, handleCardClick }) {
  //console.log(cardList);

  let shuffledCardList = shuffle(cardList);
  return (
    <>
      <div className="card-grid">
        {shuffledCardList.map((card, index) => (
          <Card
            src={card.src}
            label={card.label}
            key={index}
            handleCardClick={handleCardClick}
            index={index}
          />
        ))}
      </div>
    </>
  );
}

function Card({ src, label, handleCardClick, index }) {
  return (
    <>
      <div className="card">
        <button
          className="champ-button"
          onClick={() => {
            handleCardClick(index);
          }}
        >
          <img src={src} alt={label} width={100} />
          <span>{label}</span>
        </button>
      </div>
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

export default CardGrid;
