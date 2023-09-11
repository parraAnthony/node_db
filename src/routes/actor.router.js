const {getAllActors, actorPost, removeActor, updateActor} = require("../controllers/Actor.controllers");
const express = require('express');

const actorRouter = express.Router();

actorRouter.route("/")
        .get(getAllActors)
        .post(actorPost)
actorRouter.route("/:id")
        .delete(removeActor)
        .put(updateActor)

module.exports = actorRouter;