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
      <p>
        {genres.map((genre) => (
          <span key={`${game.id}-${genre}`}>{genre}</span>
        ))}
      </p>
      </Link>
    </div>
  );
};

export default Card;
