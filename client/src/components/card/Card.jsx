import React from 'react';
import styles from '../card/card.module.css';
import { Link } from "react-router-dom";

const Card = ({ game }) => {
  let genres = game.genres || game.Genres || []; // Verificar ambas propiedades

  if (!Array.isArray(genres)) {
    genres = genres.split(',').map((genre) => genre.trim()); // Dividir la cadena por comas y eliminar espacios en blanco
  }

  return (
    <div className={styles['card-container']}>
      <Link to={`/detail/${game.id}`}>
        <img src={game.image} alt={game.name} />
        <h3>{game.name}</h3>
        <div className={styles['card-info']}>
          <div className={styles['card-genres']}>
            {genres.map((genre) => (
              <span key={`${game.id}-${genre}`}>{genre}</span>
            ))}
          </div>
          <div className={styles['card-rating']}>
            <span>{game.rating}</span>
            <span className={styles['material-symbols-outlined']}>star</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
