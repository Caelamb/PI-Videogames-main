import React, { useState } from 'react'
import styles from "../navbar/navbar.module.css";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSumit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
  }

  return (
    <div className={styles.navbar}>
      <form onSubmit={handleSumit}>
        <input 
           placeholder='Busqueda...'
           value={searchTerm}
           onChange={(event) => setSearchTerm(event.target.value)}/>
        <button type='submit' >Buscar</button>
      </form>
    </div>
  )
}

export default Navbar
