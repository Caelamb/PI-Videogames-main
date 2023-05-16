import React from 'react'
import Card from '../card/Card.jsx'
import styles from "../cards/cards.module.css";

const Cards = ({ videogames }) => {
  if (!videogames || videogames.length === 0) {
    return <div>No se encontraron resultados</div>;
  }
  return (
    <div className={styles["card-list"]}>
      {videogames?.map(game => (
       <Card 
         key={game.id} 
         game={game}
         /> 
      ))}
    </div>
  )
}

export default Cards
