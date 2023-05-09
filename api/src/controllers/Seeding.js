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
    let games = [];

    // Realizar solicitudes hasta alcanzar 100 juegos o agotar los resultados disponibles
    let page = 1;
    while (games.length < 100) {
      const response = await axios.get(`${API_URL}&page=${page}&page_size=40`);
      const pageGames = response.data.results;
      games = games.concat(pageGames);

      if (response.data.next === null) {
        break; // No hay más resultados disponibles
      }

      page++;
    }

    // Tomar los primeros 100 juegos
    games = games.slice(0, 100);

    // Mapear los videojuegos a un formato compatible con el modelo de la base de datos
    const videogameData = games.map(game => {
      return {
        id: game.id.toString(), // Para evitar conflictos con ids ya existentes en la db
        name: game.name,
        description: game.description_raw ?? "No disponible",
        platforms: game.platforms.map(platform => platform.platform.name).join(', '),
        image: game.background_image,
        release_date: game.released ?? "No disponible",
        rating: game.rating,
      }
    });

    // Crear géneros en la base de datos
    await seedGenres();

    // Obtener los géneros desde la base de datos
    const genres = await Genres.findAll();
    
    // Guardar los videojuegos en la base de datos
    await Videogame.bulkCreate(videogameData, { ignoreDuplicates: true });

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
