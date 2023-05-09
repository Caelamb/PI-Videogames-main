import React from 'react';
import styles from "../card/card.module.css";

const Card = ({ game }) => {
  return (
    <div className={styles["card-container"]}>
      <img src={game.image} alt={game.name} />
      <h3>{game.name}</h3>
      <p>
        {game.genres?.map((genre) => (
          <span key={genre}>
            {genre}
          </span>
        ))}
        </p>
    </div>
  )
}

export default Card
