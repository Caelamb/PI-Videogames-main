const { Router } = require("express");
const { GetHandlerGenres } = require("../handlers/GenresHanders");

const genresRouter = Router();

genresRouter.get("/", GetHandlerGenres);

module.exports = genresRouter;