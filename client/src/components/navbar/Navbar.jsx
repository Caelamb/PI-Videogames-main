import React from 'react'
import styles from "../navbar/navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <form>
        <input placeholder='Busqueda...'/>
        <button>Buscar</button>
      </form>
    </div>
  )
}

export default Navbar
