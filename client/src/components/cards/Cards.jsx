import React from 'react'
import Card from '../card/Card.jsx'
import styles from "../cards/cards.module.css";

const Cards = ({ gamesList }) => {
  return (
    <div className={styles["card-list"]}>
      { gamesList?.map(game => (
       <Card key={game.id} game={game}/> 
      ))}
    </div>
  )
}

export default Cards
