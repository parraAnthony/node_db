const catchError = require('../utils/catchError');
const Actor = require('../models/Actor');
const Movie = require('../models/Movie');

const getAllActors = catchError(async(req, res) => {
    // Operaciones...
    const actor = await Actor.findAll( {include: [Movie]} )
    return res.json(actor)
});
const actorPost = catchError(async (req, res) => {
    const { firts_name, last_name, nationality, image, birthday} = req.body
    const newActor = await Actor.create( {
        firts_name,
        last_name,
        nationality,
        image,
        birthday
    })
    return res.status(201).json(newActor)
})
const removeActor = catchError(async(req, res)=>{
    const { id } = req.params
    await Actor.destroy( {where: {id} } )
    return res.sendStatus(204)
})
const updateActor = catchError(async(req, res)=>{
    const {id}= req.params;
    const { firts_name, last_name, nationality, image, birthday} = req.body
    const actor = await Actor.update( {
        firts_name,
        last_name,
        nationality,
        image,
        birthday
    },{where: {id}, returning: true})
    return res.json(actor)
})

module.exports = {
    getAllActors,
    actorPost,
    updateActor,
    removeActor
}