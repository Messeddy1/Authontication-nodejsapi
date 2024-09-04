const express = require('express')
const { Regester, Login, logOut } = require('../Controllers/Auth')
// const protecteur = require('../midlwear/verifyTkoen')
const Router = express.Router()

Router.post("/register",Regester)
Router.post("/login",Login)
Router.post("/logout",logOut)
module.exports = Router