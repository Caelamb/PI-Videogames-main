import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, filterGamesByGenre, filterGamesByOrigin, searchGames, setCurrentPage, sortGames } from '../../redux/actions/index';
import Cards from '../../components/cards/Cards.jsx';
import Filters from '../../components/filter/Filters';
import Pagination from '../../components/pagination/Pagination';
import Navbar from '../../components/navbar/Navbar.jsx';

const Home = () => {
  const dispatch = useDispatch();
  const gamesList = useSelector(state => state.gamesList);
  const currentPage = useSelector(state => state.currentPage);
  const filteredGames = useSelector(state => state.filteredGames);
  const totalPages = useSelector(state => state.totalPages);

  useEffect(() => {
    dispatch(fetchGames(currentPage));
  }, [dispatch, currentPage]);

  const handleSearch = (searchTerm) => {
    dispatch(searchGames(searchTerm));
  };

  const handleGenreFilter = (genre) => {
    dispatch(filterGamesByGenre(genre));
  };

  const handleOriginFilter = (origin) => {
    dispatch(filterGamesByOrigin(origin));
  };

  const handleSort = (sortBy, sortOrder) => {
    dispatch(sortGames(sortBy, sortOrder));
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <Filters 
        onGenreFilter={handleGenreFilter} 
        onOriginFilter={handleOriginFilter} 
        onSort={handleSort} />
      <Cards gamesList={filteredGames.length > 0 ? filteredGames : gamesList} />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange} />
    </div>
  );
};

export default Home;