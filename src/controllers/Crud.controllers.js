const catchError = require('../utils/catchError');
const Crud = require('../models/Crud');

const getAll = catchError(async(req, res) => {
    const  cruds = await Crud.findAll();
    return res.json(cruds)
});
const getOneCrud = catchError(async(req, res)=>{
    const { id } = req.params;
    const crud = await Crud.findByPk(id)
    return res.json(crud)
});
const createCrud = catchError(async(req, res)=>{
    const {first_name, last_name, email, password, birthday} = req.body;
    const newCrud = await Crud.create({
        first_name,
        last_name,
        email,
        password,
        birthday
    })
    return res.status(201).json(newCrud)
});
const deleteCrud = catchError(async(req, res)=>{
    const { id } = req.params;
    await Crud.destroy({ where: {id} })
    return res.sendStatus(204)
})
const updateCrud = catchError(async(req, res)=>{
    const {id} = req.params;
    const {first_name, last_name, email, password, birthday} = req.body;
    const crud = await Crud.update({
        first_name,
        last_name,
        email,
        password,
        birthday
    }, {where: {id}, returning: true });
    return res.json(crud)
})

module.exports = {
    getAll,
    getOneCrud,
    updateCrud,
    createCrud,
    deleteCrud
}