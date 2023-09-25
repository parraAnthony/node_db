const catchError = require('../utils/catchError');
const Genre = require('../models/Genre');

const getAllGenre = catchError(async(req, res) => {
    const genres = await Genre.findAll()
    return res.json(genres)
});
const postGenre = catchError(async(req, res)=>{
    const {name} = req.body
    const genre = await Genre.create({
        name
    })
    return res.status(201).json(genre)
})
const removeGenre = catchError(async(req, res)=>{
    const { id } = req.params;
    await Genre.destroy({ where: {id} })
    return res.sendStatus(204)
})
const updateGenre = catchError(async(req, res)=>{
    const {id} = req.params
    const { name } = req.body
    await Genre.update({
        name
    }, {where: {id}, returning: false})
    const genre = await Genre.findByPk(id)
    return res.json(genre)
})


module.exports = {
    getAllGenre,
    postGenre,
    removeGenre,
    updateGenre
}