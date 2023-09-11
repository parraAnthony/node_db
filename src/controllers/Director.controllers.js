const catchError = require('../utils/catchError');
const Director = require('../models/Director');
const Movie = require('../models/Movie');

const getAllDirectors = catchError(async(req, res) => {
    // Operaciones...
    const director = await Director.findAll( {include: [Movie] } )
    return res.json(director)
});
const directorPost = catchError(async(req, res)=>{
    const { firtsName, lastName, nationality, image, birthday} = req.body
    const newDirector = await Director.create( {
        firtsName,
        lastName,
        nationality,
        image,
        birthday
    })
    return res.status(201).json(newDirector)
})
const removeDirector = catchError(async(req, res)=>{
    const {id}= req.params;
    if(id==0){return res.sendStatus(404)}
    await Director.destroy( {where: {id} })
    return res.sendStatus(204)
})
const updateDirector = catchError(async(req, res)=>{
    const {id}= req.params;
    const { firts_name, last_name, nationality, image, birthday} = req.body
    const director = await Director.update( {
        firts_name,
        last_name,
        nationality,
        image,
        birthday
    },{where: {id}, returning: true})
    return res.json(director)
})

module.exports = {
    getAllDirectors,
    directorPost,
    updateDirector,
    removeDirector
}