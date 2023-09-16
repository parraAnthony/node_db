const { getAll, createCrud, getOneCrud, deleteCrud, updateCrud } = require('../controllers/Crud.controllers');
const express = require('express');

const CrudRouter = express.Router();

CrudRouter.route("/")
	.get(getAll)
        .post(createCrud)
        
CrudRouter.route("/:id")
        .get(getOneCrud)
        .delete(deleteCrud)
        .put(updateCrud)
        

module.exports = CrudRouter;