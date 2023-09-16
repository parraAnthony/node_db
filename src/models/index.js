const Movie = require('../models/Movie')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')
const EmailCode = require('./EmailCode')
const User = require('./User')

Movie.belongsToMany(Actor, {through: "movieActor"})
Actor.belongsToMany(Movie, {through: "movieActor"})

Movie.belongsToMany(Director, {through: "movieDirector"})
Director.belongsToMany(Movie, {through: "movieDirector"})

Movie.belongsToMany(Genre, {through: "movieGenre"})
Genre.belongsToMany(Movie, {through: "movieGenre"})

EmailCode.belongsTo(User);
User.hasOne(EmailCode);
