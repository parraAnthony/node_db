const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

const getAllMovies = catchError(async(req, res) => {
    // Operaciones...
    const movie = await Movie.findAll( {include: [Actor, Director, Genre] }) 
    return res.json(movie)
});
const moviePost = catchError(async(req, res)=>{
    const { name, image, synopsis, releaseYear} = req.body
    const newMovie = await Movie.create({
        name,
        image, 
        synopsis, 
        releaseYear
    })
    return res.status(201).json(newMovie)
})
const updateMovie = catchError(async(req, res)=>{
    const {id} = req.params;
    const movie = await Movie.update({
        name,
        image, 
        synopsis, 
        releaseYear
    }, {where: {id}, returning: true})
    res.json(movie)
})

const removeMovie = catchError(async(req, res)=>{
    const { id } = req.params;
    await Movie.destroy({ where: {id} })
    return res.sendStatus(204)
})

const setMovieActors = catchError(async(req, res)=>{
    const { id } = req.params;
    if(id==0){return res.sendStatus(404)}
    const movie = await Movie.findByPk(id);
    await movie.setActors(req.body)
    const actors = await movie.getActors()
    return res.status(201).json(actors)
})
const setMovieDirectors = catchError(async(req, res)=>{
    const {id} = req.params;
    if(id==0){return res.sendStatus(404)}
    const movie = await Movie.findByPk(id);
    await movie.setDirectors(req.body)
    const director = await movie.getDirectors()
    return res.status(201).json(director)
})
const setMovieGenres = catchError(async(req, res)=>{
    const {id} = req.params;
    if(id==0){return res.sendStatus(404)}
    const movie = await Movie.findByPk(id);
    await movie.setGenres(req.body)
    const genres = await movie.getGenres()
    return res.status(201).json(genres)
})

module.exports = {
    getAllMovies,
    moviePost,
    updateMovie,
    removeMovie,
    setMovieActors,
    setMovieDirectors,
    setMovieGenres
}