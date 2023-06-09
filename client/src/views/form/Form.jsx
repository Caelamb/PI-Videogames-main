import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormVideogames, getByGenres, getAllPlatforms } from "../../redux/actions";
import { Link } from "react-router-dom";
import styles from "../form/form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const genres = useSelector(state => state.Genres);
  const platforms = useSelector(state => state.platforms);

  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    platforms: "",
    releaseDate: "",
    rating: "",
    genres: [],
  });

  const [error, setError] = useState({
    name: "",
    rating: "",
  });

  useEffect(() => {
    dispatch(getByGenres());
    dispatch(getAllPlatforms());
  }, [dispatch]);

  const validate = (input) => {
    let errors = {};

    if (input.name === "" || !/^[a-zA-Z0-9\s]+$/.test(input.name)) {
      errors.name = "Ingrese un nombre válido";
    }

    if (input.rating === "" || input.rating > 10) {
      errors.rating = "Ingrese un rating válido (máximo 10)";
    }

    return errors;
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleRatingChange = (e) => {
    let value = parseInt(e.target.value);
  
    // Verifica si el valor es menor que 0
    if (value < 0) {
      value = 0;
    }
    // Verifica si el valor es mayor que 10
    else if (value > 10) {
      value = 10;
    }
  
    setInput({
      ...input,
      rating: value,
    });
  
    setError(
      validate({
        ...input,
        rating: value,
      })
    );
  };
  

  const handleGenreChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setInput(prevState => ({
      ...prevState,
      genres: prevState.genres.includes(selectedOptions[0])
        ? prevState.genres.filter(genre => genre !== selectedOptions[0])
        : [...prevState.genres, selectedOptions[0]],
    }));
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setInput({
        ...input,
        image: reader.result,
      });
    };
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      // Dispatch de la acción para crear el videojuego
      dispatch(FormVideogames(input));

      // Limpiar los campos del formulario
      setInput({
        name: "",
        image: "",
        description: "",
        platforms: "",
        releaseDate: "",
        rating: "",
        genres: [],
      });
    } else {
      alert("FALTAN CAMPOS A COMPLETAR O HAY ERRORES EN LOS CAMPOS");
    }
  };

  const uniquePlatforms = platforms
  .flatMap((platform) => platform.split(","))
  .map((individualPlatform) => individualPlatform.trim())
  .filter((platform, index, array) => array.indexOf(platform) === index);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" value={input.name} onChange={handleChange} />
        </div>
        <span>{error.name}</span>
        <div>
          <label>Image: </label>
          <input type="file" accept="image/*" name="image" onChange={handleImageChange} />
        </div>
        <div>
          <label>Description: </label>
          <input
            name="description"
            value={input.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Platforms: </label>
          <select
            name="platforms"
            value={input.platforms}
            onChange={handleChange}
          >
            <option value="">Select a platform</option>
            {uniquePlatforms.flatMap((platform) =>
           <option key={platform} value={platform}>
              {platform}
           </option>
          )}
          </select>
        </div>
        <div>
        <label>Release Date: </label>
          <input
            name="releaseDate"
            type="date"
            value={input.releaseDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ratting: </label>
          <input
            name="rating"
            type="number"
            value={input.rating}
            onChange={handleRatingChange}
          />
        </div>
        <span>{error.rating}</span>
        <div>
          <label>Genres: </label>
          <select
            name="genres"
            multiple
            value={input.genres}
            onChange={handleGenreChange}
              > 
        <option value="">Select a Genres</option>
            {genres.map((genre) => (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Video Game</button>
      <Link to="/home" className={styles.button}>Go back to the main page</Link>
      </form>
    </div>
  );
};

export default Form;