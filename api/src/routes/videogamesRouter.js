const { Router } = require("express");
const { getVideogames } = require("../handlers/videogameHandlers");
const { getVideogameId } = require("../handlers/videogameHandlers");
const { getVideogamesByName } = require("../handlers/videogameHandlers");
const { postVideogame } = require("../handlers/videogameHandlers");

const videogamesRouter = Router();

videogamesRouter.get("/", getVideogames);
videogamesRouter.get("/:idVideogame", getVideogameId);
videogamesRouter.get("/", getVideogamesByName);
videogamesRouter.post("/", postVideogame);

module.exports = videogamesRouter;