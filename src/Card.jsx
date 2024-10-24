import { useState, useEffect } from "react";

function CardGrid({ cardList, handleCardClick }) {
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
        {/* <img src={src} alt={label} /> */}
        <button
          className="edit-exp"
          onClick={() => {
            handleCardClick(index);
          }}
        >
          <span>{label}</span>
        </button>
      </div>
    </>
  );
}

export default CardGrid;
