import React from 'react'
import Card from '../card/Card'
import styles from "../cards/cards.module.css";

const Cards = ({ allUsers }) => {
  return (
    <div className={styles['card-container']}>
      { allUsers?.map(user => (
       <Card classname={styles.card} key={user.id} user={user}/> 
      ))}
    </div>
  )
}

export default Cards
