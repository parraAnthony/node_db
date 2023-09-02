const catchError = require('../utils/catchError');
const User = require('../models/User');
const { where } = require('sequelize');

const getAll = catchError(async(req, res) => {
    const  users = await User.findAll();
    return res.json(users)
});
const getOneUser = catchError(async(req, res)=>{
    const { id } = req.params;
    const user = await User.findByPk(id)
    return res.json(user)
});
const createUser = catchError(async(req, res)=>{
    const {first_name, last_name, email, password, birthday} = req.body;
    const newUser = await User.create({
        first_name,
        last_name,
        email,
        password,
        birthday
    })
    return res.status(201).json(newUser)
});
const deleteUser = catchError(async(req, res)=>{
    const { id } = req.params;
    await User.destroy({ where: {id} })
    return res.sendStatus(204)
})
const updateUser = catchError(async(req, res)=>{
    const {id} = req.params;
    const {first_name, last_name, email, password, birthday} = req.body;
    const user = await User.update({
        first_name,
        last_name,
        email,
        password,
        birthday
    }, {where: {id}, returning: true });
    return res.json(user)
})

module.exports = {
    getAll,
    getOneUser,
    updateUser,
    createUser,
    deleteUser
}