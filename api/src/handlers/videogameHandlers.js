const { getAllVideogames } = require("../controllers/videogameControllers");

const getVideogames = async (req,res) => {
    try {
        const videogames = await getAllVideogames();
        res.json(videogames);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error in the server"});
    }
};

module.exports = {
    getVideogames
};