import React, { useState } from "react";

const Create = () => {
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

  const handleGenreChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setInput({
      ...input,
      genres: selectedOptions,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      // Realizar la acción de creación del videojuego
      alert("HACER DISPATCH O PETICIÓN AXIOS PARA CREAR EL VIDEOJUEGO");
    } else {
      alert("FALTAN CAMPOS A COMPLETAR O HAY ERRORES EN LOS CAMPOS");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "16rem",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre: </label>
          <input name="name" value={input.name} onChange={handleChange} />
        </div>
        <span>{error.name}</span>
        <div>
          <label>Imagen: </label>
          <input name="image" value={input.image} onChange={handleChange} />
        </div>
        <div>
          <label>Descripción: </label>
          <input
            name="description"
            value={input.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Plataformas: </label>
          <input
            name="platforms"
            value={input.platforms}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fecha de lanzamiento: </label>
          <input
            name="releaseDate"
            value={input.releaseDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rating: </label>
          <input
            name="rating"
            type="number"
            value={input.rating}
            onChange={handleChange}
          />
        </div>
        <span>{error.rating}</span>
        <div>
          <label>Géneros: </label>
          <select
            name="genres"
            multiple
            value={input.genres}
            onChange={handleGenreChange}
          >
            <option value="accion">Acción</option>
            <option value="aventura">Aventura</option>
            <option value="estrategia">Estrategia</option>
            <option value="deportes">Deportes</option>
            <option value="rpg">RPG</option>
            <option value="shooter">Shooter</option>
            <option value="simulacion">Simulación</option>
            </select>
            </div>
            {Object.keys(error).length === 0 ? (
            <button type="submit">Crear</button>
            ) : null}
            </form>
            </div>
            );
            };
            
            export default Create;
