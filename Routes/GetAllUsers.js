const express = require('express')
const { GetALLUsers } = require('../Controllers/getAllUsers')
const protecteur = require('../midlwear/verifyTkoen')
const Router = express.Router()

Router.get("/all",protecteur,GetALLUsers)

module.exports = Router