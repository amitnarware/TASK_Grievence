// routes/userRoutes.js
const express = require('express');
const User_router = express.Router();
const {postregister,postlogin} = require("../controller/userController")

User_router.post('/register',postregister );
User_router.post('/login', postlogin);

module.exports ={User_router}


