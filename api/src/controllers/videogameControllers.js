const axios = require("axios");
const { Videogame, Genres } = require("../db");
const { Op } = require("sequelize"); 

const getAllVideogames = async () => {
    try {
        const videogames = await Videogame.findAll();
        return videogames;
    } catch (err) {
        console.error(err);
        throw new Error("Error in the server");
    }
};

const getVideogameById = async (idVideogame) => {
    try {
     // Buscar el videojuego en la base de datos
    const videogame = await Videogame.findOne({
        where: { id: idVideogame },
        include: Genres,
      });
  
      if (videogame) {
        // Si el videojuego existe en la base de datos, devolverlo
        return videogame;
      } else {
        // Si no existe en la base de datos, hacer una llamada a la API
        const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${process.env.API_KEY}`)

        // Crear un objeto con la información del videojuego
        const videogameDetail = {
            id: response.data.id,
            name: response.data.name,
            description: response.data.description_raw,
            releaseDate: response.data.released,
            rating: response.data.rating,
            platforms: response.data.platforms.map((platform) => platform.platform.name),
            genres: response.data.genres.map((genre) => genre.name),
          };
      
          return videogameDetail;
        }
    } catch (err) {
        console.error(err);
        throw new Error("Error in the server");
    }
};

const searchVideogamesByName = async (name) => {
    try {
        // Convertir la cadena recibida en minúsculas
        const nameLower = name.toLowerCase();

        //Buscar en la API
        const apiResponse = await axios.get(
            `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${nameLower}&page_size=15`);

        const apiVideogames = apiResponse.data.results.map((vg) => ({
            id: vg.id,
            name: vg.name,
            description: vg.description || "",
            platforms: vg.platforms.map((platforms) => platforms.platforms.name),
            image: vg.background_image || "",
            release_date: vg.release || "",
            rating: vg.rating || null,
            genres: vg.genres.map((Genres) => Genres.name),
            source: "API",
        }));

        //Buscar en la base de datos
        const dbVideogames = await Videogame.findAll({
            where: {
              name: {
                [Op.iLike]: `%${nameLower}%`,
              },
            },
            include: {
              model: Genres,
              attributes: ["name"],
              through: { attributes: [] },
            },
            limit: 15,
          });
      
          const dbVideogamesFormatted = dbVideogames.map((vg) => ({
            id: vg.id,
            name: vg.name,
            description: vg.description || "",
            platforms: vg.platforms,
            image: vg.image || "",
            release_date: vg.release_date || "",
            rating: vg.rating || null,
            genres: vg.genres.map((genre) => genre.name),
            source: "DB",
          }));

          const videogames = [...apiVideogames, ...dbVideogamesFormatted];

    if (videogames.length === 0) {
      throw new Error("No se encontraron resultados para la búsqueda");
    }

    return videogames;

    } catch (err) {
        console.error(err);
        throw new Error("Error in the server");
    }
};

const createVideogame = async (name, description, release_date, rating, platforms, genres) => {
    try {
        const videogame = await Videogame.create({
            name,
            description,
            release_date,
            rating,
            platforms,
        });

        await videogame.addGenres(genres);

        const response = {
            id: videogame.id,
            name: videogame.name,
            description: videogame.description,
            release_date: videogame.release_date,
            rating: videogame.rating,
            platforms: videogame.platforms,
            genres: genres,
        }
        return response;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    getAllVideogames,
    getVideogameById,
    searchVideogamesByName,
    createVideogame
};