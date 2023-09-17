const express = require('express');
const { create, getAll, remove, verifyEmail, login, loggedUser, getOne, updateUser, resetpassword, newPassword } = require('../controllers/user.controllers');
const verifyJWT = require("../utils/verifyJWT")

const userRouter = express.Router();

userRouter.route("/verify/:code")
                .get(verifyEmail)

userRouter.route("/reset_password/:code")
                .post(newPassword)

userRouter.route("/")
                .get(getAll)
		.post(create)

userRouter.route("/me")
                .get(verifyJWT, loggedUser)

userRouter.route("/login")
                .post(login)

userRouter.route("/reset_password")
                .post(resetpassword)

userRouter.route("/:id")
                .get(verifyJWT, getOne)
                .delete(remove)
                .put(verifyJWT, updateUser)

module.exports = userRouter;