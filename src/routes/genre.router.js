const { getAllGenre, postGenre, removeGenre, updateGenre } = require('../controllers/Genre.controlles');
const express = require('express');

const genreRouter = express.Router();

genreRouter.route("/")
        .get(getAllGenre)
        .post(postGenre)

genreRouter.route("/:id")
        .put(updateGenre)
        .delete(removeGenre)
            
module.exports = genreRouter;