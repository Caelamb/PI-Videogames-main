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

const getVideogameApi = async (name) => {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${name}&page_size=15`);
    const apiVideogames = response.data.results.map((vg) => {
      return {
        id: vg.id,
        name: vg.name,
        description: vg.description || "",
        platforms: vg.platforms.map((platform) => platform.platform.name),
        image: vg.background_image || "",
        release_date: vg.released || "",
        rating: vg.rating || null,
        genres: vg.genres.map((genre) => genre.name),
        source: "API",
      };
    });
    return apiVideogames;
  };
  
  const getVideogameDB = async (name) => {
    const dbVideogames = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
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
  
    return dbVideogamesFormatted;
  };
  
  const searchVideogamesByName = async (name) => {
    const VideogameDB = await getVideogameDB(name); // Videojuegos de la base de datos
    const VideogameApi = await getVideogameApi(name); // Videojuegos de la API
    const allVideogames = [...VideogameDB, ...VideogameApi]; // Todos los videojuegos
    if (name) {
      let filterVideogames = allVideogames.filter(
        (videogame) => videogame.name.toLowerCase().includes(name.toLowerCase())
      );
      if (filterVideogames.length) {
        return filterVideogames;
      }
    } else {
      return allVideogames;
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