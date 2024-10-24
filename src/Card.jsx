import { useState, useEffect } from "react";

function CardGrid({ cardList, handleCardClick }) {
  console.log(cardList);
  return (
    <>
      <div className="card-grid">
        {cardList.map((card, index) => (
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

export default CardGrid;
