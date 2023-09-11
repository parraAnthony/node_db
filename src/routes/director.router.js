const express = require('express');
const { getAllDirectors, directorPost, removeDirector, updateDirector } = require('../controllers/Director.controllers');

const directorRouter = express.Router();

directorRouter.route("/")
        .get(getAllDirectors)
        .post(directorPost)
directorRouter.route("/:id")
        .delete(removeDirector)
        .put(updateDirector)

module.exports = directorRouter;