import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "../home/home.module.css";

import {
  fetchInitialVideogames,
  searchVideogames,
  filterVideogamesByGenre,
  filterVideogamesBySource,
  sortVideogamesByAlphabet,
  sortVideogamesByRating,
  changePage,
} from "../../redux/actions/index"

import Cards from '../../components/cards/Cards.jsx';
import Filters from '../../components/filter/Filters';
import Pagination from '../../components/pagination/Pagination';
import Navbar from '../../components/navbar/Navbar.jsx';

const Home = () => {
  const dispatch = useDispatch();;
  const videogames = useSelector((state) => state.videogames);
  const currentPage = useSelector((state) => state.currentPage);

  useEffect(() => {
    dispatch(fetchInitialVideogames());
  }, [dispatch]);

  const handleSearch = (searchQuery) => {
    dispatch(searchVideogames(searchQuery));
  };

  const handleFilterByGenre = (genre) => {
    dispatch(filterVideogamesByGenre(genre));
  };

  const handleFilterBySource = (source) => {
    dispatch(filterVideogamesBySource(source));
  };

  const handleSortByAlphabet = (order) => {
    dispatch(sortVideogamesByAlphabet(order));
  };

  const handleSortByRating = (order) => {
    dispatch(sortVideogamesByRating(order));
  };

  const handleChangePage = (pageNumber) => {
    dispatch(changePage(pageNumber));
  };

  // Lógica de paginación y límite de juegos por página
  const itemsPerPage = 15;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedVideogames = videogames.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      <Navbar onSearch={handleSearch} />
      <Filters 
        onFilterByGenre={handleFilterByGenre}
        onFilterBySource={handleFilterBySource}
        onSortByAlphabet={handleSortByAlphabet}
        onSortByRating={handleSortByRating}/>
      <Pagination 
        onChangePage={handleChangePage} 
        currentPage={currentPage}
        totalPages={Math.ceil(videogames.length / itemsPerPage)} />
      <Cards 
        videogames={displayedVideogames}
        />
    </div>
  );
};

export default Home;
