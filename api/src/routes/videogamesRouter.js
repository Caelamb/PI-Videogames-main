const { Router } = require("express");
const { getVideogames } = require("../handlers/videogameHandlers");

const videogamesRouter = Router();

videogamesRouter.get("/", getVideogames);
videogamesRouter.get("/:idVideogame",)
videogamesRouter.get("/",)
videogamesRouter.post("/",)

module.exports = videogamesRouter;