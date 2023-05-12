import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByGenres, getAllPlatforms } from "../../redux/actions/index";
import styles from "../filter/filters.module.css";

const Filters = ({ 
  onFilterByGenre,
  onFilterBySource,
  onSortByAlphabet, 
  onSortByRating 
}) => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.Genres);
  const plataforms = useSelector((state) => state.platforms);

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [alphabetOrder, setAlphabetOrder] = useState("");
  const [ratingOrder, setRatingOrder] = useState("");

  useEffect(() => {
    dispatch(getByGenres());
    dispatch(getAllPlatforms());
  }, [dispatch]);

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
    <div className={styles["filters-container"]}>
      <div className={styles["filter-item"]}>
        <label className={styles.label} htmlFor="genre-select">Genre: </label>
        <select  className={styles.select} id="genre-select" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Videogames</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles["filter-item"]}>
        <label className={styles.label} htmlFor="source-select">Source: </label>
        <select className={styles.select} id="source-select" value={selectedSource} onChange={handleSourceChange}>
        <option value="">All Videogames</option>
          {plataforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>
      <div className={styles["filter-item"]}>
        <label className={styles.label} htmlFor="alphabet-select">Sort by Alphabet: </label>
        <select className={styles.select} id="alphabet-select" value={alphabetOrder} onChange={handleAlphabetChange}>
          <option value="">All Videogames</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className={styles["filter-item"]}>
        <label className={styles.label} htmlFor="rating-select">Sort by Rating: </label>
        <select className={styles.select} id="rating-select" value={ratingOrder} onChange={handleRatingChange}>
          <option value="">All Videogames</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;