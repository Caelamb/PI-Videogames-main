const { getAllVideogames, getVideogameById } = require("../controllers/videogameControllers");
const { searchVideogamesByName, createVideogame } = require("../controllers/videogameControllers");

// const getVideogames = async (req,res) => {
//     try {
//         const videogames = await getAllVideogames();
//         res.json(videogames);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Error in the server"});
//     }
// };

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
    const { name } = req.query
    try {
        let videogames
        if(name){
            videogames = await searchVideogamesByName(name);
        } else {
            videogames = await getAllVideogames()
        }
      res.status(200).json(videogames);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error in the server" });
    }
  };

const postVideogame = async (req, res) => {
    const {name, description, release_date, rating, platforms, genres} = req.body;

    try {
        const Videogame = await createVideogame(name, description, release_date, rating, platforms, genres);
        res.status(201).json(Videogame);
    } catch (err) {
        res.status(500).json({ message: "Error creating Videogame"});
    }
};

module.exports = {
    getVideogameId,
    getVideogamesByName,
    postVideogame
};