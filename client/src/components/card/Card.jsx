import React from 'react'
import styles from "../card/card.module.css";

const Card = ({ user }) => {
  return (
    <div className = {styles.container}>
      <h3 className = {styles.name}>{user.name}</h3>
      <p className = {styles.image}>{user.image}</p>
      <p className = {styles.genres}>{user.genres}</p>
    </div>
  )
}

export default Card
