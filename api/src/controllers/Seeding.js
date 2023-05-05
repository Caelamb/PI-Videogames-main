const axios = require('axios');
const { Videogame, Genres } = require('../db');
const { API_KEY } = process.env;
const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const seedGenres = async () => {
  try {
    // Obtener géneros desde la API
    const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genres = response.data.results;

    // Mapear los géneros a un formato compatible con el modelo de la base de datos
    const genreData = genres.map(genre => {
      return {
        name: genre.name,
      }
    });

    // Guardar los géneros en la base de datos
    await Genres.bulkCreate(genreData, { ignoreDuplicates: true });

    console.log('Genres seeded successfully');
  } catch (error) {
    console.error('Error seeding genres:', error);
  }
};

const seedDatabase = async () => {
  try {
    // Obtener videojuegos desde la API
    const response = await axios.get(API_URL);
    const games = response.data.results;

    // Mapear los videojuegos a un formato compatible con el modelo de la base de datos
    const videogameData = games.map(game => {
      return {
        id: game.id.toString(), // Para evitar conflictos con ids ya existentes en la db
        name: game.name,
        description: game.description_raw,
        platforms: game.platforms.map(platform => platform.platform.name).join(', '),
        image: game.background_image,
        release_date: game.release_date,
        rating: game.rating,
      }
    });

    // Guardar los videojuegos en la base de datos
    await Videogame.bulkCreate(videogameData, { ignoreDuplicates: true });

    // Crear géneros en la base de datos
    await seedGenres();

    // Obtener los géneros desde la base de datos
    const genres = await Genres.findAll();

    // Asociar géneros a los videojuegos
    for (let i = 0; i < games.length; i++) {
      const game = games[i];
      const videogame = await Videogame.findByPk(game.id.toString());
      await videogame.addGenres(genres.filter(genre => game.genres.some(g => g.name === genre.name)));
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = { seedDatabase };
