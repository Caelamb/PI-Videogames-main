import React, { useState } from "react";

const Filters = ({ onFilterByGenre, onFilterBySource, onSortByAlphabet, onSortByRating }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [alphabetOrder, setAlphabetOrder] = useState("");
  const [ratingOrder, setRatingOrder] = useState("");

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    onFilterByGenre(event.target.value);
  };

  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
    onFilterBySource(event.target.value);
  };

  const handleAlphabetChange = (event) => {
    setAlphabetOrder(event.target.value);
    onSortByAlphabet(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRatingOrder(event.target.value);
    onSortByRating(event.target.value);
  };

  return (
    <div className="filters-container">
      <div className="filter-item">
        <label htmlFor="genre-select">Genre: </label>
        <select id="genre-select" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All genres</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Role-playing">Role-playing</option>
          <option value="Simulation">Simulation</option>
          <option value="Strategy">Strategy</option>
          <option value="Sports">Sports</option>
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="source-select">Source: </label>
        <select id="source-select" value={selectedSource} onChange={handleSourceChange}>
          <option value="">All sources</option>
          <option value="PC">PC</option>
          <option value="PlayStation">PlayStation</option>
          <option value="Xbox">Xbox</option>
          <option value="Nintendo">Nintendo</option>
          <option value="Mobile">Mobile</option>
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="alphabet-select">Sort by Alphabet: </label>
        <select id="alphabet-select" value={alphabetOrder} onChange={handleAlphabetChange}>
          <option value="">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="rating-select">Sort by Rating: </label>
        <select id="rating-select" value={ratingOrder} onChange={handleRatingChange}>
          <option value="">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;