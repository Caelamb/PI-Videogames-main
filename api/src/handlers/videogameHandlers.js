const { getAllVideogames, getVideogameById } = require("../controllers/videogameControllers");
const { searchVideogamesByName } = require("../controllers/videogameControllers");

const getVideogames = async (req,res) => {
    try {
        const videogames = await getAllVideogames();
        res.json(videogames);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error in the server"});
    }
};

const getVideogameId = async (req, res) => {
    const { idVideogame } = req.params;
    try {
        const videogame = await getVideogameById(idVideogame);
        res.json(videogame)
    } catch (err) {
        res.status(500).json({ message: "Error in the server"});
    }
};

const getVideogamesByName = async (req, res) => {
    try {
      const name = req.query.name;
      const videogames = await searchVideogamesByName(name);
      res.json(videogames);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error in the server" });
    }
  };

module.exports = {
    getVideogames,
    getVideogameId,
    getVideogamesByName
};