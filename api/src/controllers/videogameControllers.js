const { videogame } = require("../db");

const getAllVideogames = async () => {
    try {
        const videogames = await videogame.findAll();
        return videogames;
    } catch (err) {
        console.error(err);
        throw new Error("Error in the server");
    }
};

module.exports = {
    getAllVideogames
};