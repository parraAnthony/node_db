const catchError = require('../utils/catchError');
const sendEmail = require("../utils/sendEmail")
const EmailCode = require("../models/EmailCode")
const User = require('../models/User');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const getAll = catchError(async(req, res)=>{
    const users = await User.findAll();
    return res.json(users)
})

const getOne = catchError(async(req, res)=>{
    const {id}= req.params;
    const user = await User.findByPk(id);
    if(!user){res.status(401).json("Username does not exist")}
    return res.status(201).json(user);
})

const updateUser = catchError(async(req, res)=>{
    const {id}=req.params
    const {firstName, lastName} = req.body;
    const user = await User.update({
        firstName,
        lastName
    },{where: {id}, returning: true })
    return res.json(user)
})

const create = catchError(async(req, res) => {
    const {firstName, lastName, email, password, country, image, frontBaseUrl} = req.body;
    const cryptPassword = await bcrypt.hash(password, 10);  
    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: cryptPassword,
        country,
        image
    })
    const code = require('crypto').randomBytes(32).toString('hex')
    const link = `${frontBaseUrl}/auth/verify/${code}`

    await EmailCode.create({
        code,
        userId: newUser.id
    })


    await sendEmail({
        to: email,
        subject: "verifying email for the users application",
        html:`
        <h1>Welcome ${firstName} ${lastName}</h1>
        <a href=${link}>Verificar correo</a> 
        `
    })
    // Operaciones...
    return res.json(newUser)
});

const remove = catchError(async(req, res)=>{
    const {id}=req.params
    await EmailCode.destroy({where: {userId: id}})
    await User.destroy({where:{id}})
    return res.sendStatus(204)
})
const verifyEmail = catchError(async(req, res)=>{
    const {code} = req.params;
    const emailCode = await EmailCode.findOne({where: {code}})

    if(!emailCode){return res.status(401).json("Invalid Code")}

    await User.update({
        isVerified: true
    },{where: {id: emailCode.userId}, returning:true})
    await emailCode.destroy()

    return res.sendStatus(204)
})

const login = catchError(async(req, res)=>{
    const { email, password} = req.body;
    const user = await User.findOne({where: {email} })
    if(!user){return res.status(401).json("Invalid credentials")}
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){return res.status(401).json("Invalid credentials")}
    if(!user.isVerified){return res.status(401).json("Account no verified")}
    
    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        { expiresIn: "1d"}
    )

    return res.json({user, token})
})

const loggedUser = (async(req, res)=>{
    const user = req.user;
    return res.status(201).json(user)
})
const resetpassword = (async(req, res)=>{
    const {email, frontBaseUrl} = req.body
    const code = require('crypto').randomBytes(32).toString('hex')
    const link = `${frontBaseUrl}/auth/reset_password/${code}`
    const user = await User.findOne({where: {email} })
    if(!user){return res.status(401).json("Invalid mail")}

    await EmailCode.create({
        code,
        userId: user.id
    })

    await sendEmail({
        to: email,
        subject: "Change account password",
        html:`
        <h1>Your password change ${user.firstName} ${user.lastName}</h1>
        <a href=${link}>Change password</a>
        `
    })
    return res.sendStatus(204)
})
const newPassword = ( async(req, res)=>{
    const {code} = req.params
    const {password} = req.body
    const cryptPassword = await bcrypt.hash(password, 10)
    const emailCode = await EmailCode.findOne({where: {code}})
    if(!emailCode){return res.status(401).json("Invalid Code")}
    await User.update({
        password: cryptPassword
    },{where:{id: emailCode.userId}, returning: true})
    await emailCode.destroy()
    
    return res.sendStatus(204)
})

module.exports = {
    create,
    remove,
    verifyEmail,
    login,
    loggedUser,
    getAll,
    getOne,
    updateUser,
    newPassword,
    resetpassword,
}