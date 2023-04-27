const axios = require("axios");
const { Genres } = require("../db");

const getAllGenres = async () => {
    try {
        let genres = await Genres.findAll();
        if(genres.length === 0) {
    // Si no hay géneros en la base de datos, los obtenemos de la API y los guardamos
          const response = await axios.get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`);
          const genresData = response.data.results;

          const createdGenres = await Promise.all(genresData.map(async (genre) => {
            const { id, name } = genre;
            return await Genres.create({ id, name });
          }));
          return createdGenres;
        } else {
            return genres;
        }
    } catch (err) {
        console.log(err);
        throw new Error('Error retrieving genres');
    }
};

module.exports = {
    getAllGenres
};