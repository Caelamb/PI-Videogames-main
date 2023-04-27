const { getAllGenres } = require("../controllers/GenresControllers");

const GetHandlerGenres = async (req, res) => {
    try {
        const genres = await getAllGenres();
        res.status(200).json(genres);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message});
    }
};

module.exports = {
    GetHandlerGenres
};