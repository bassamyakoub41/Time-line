const express = require("express");
const app = express();
const routes = require ('./config/routes')
const mongoose= require('./config/mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser')
require("dotenv").config()

app.set('view engine','ejs')
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));
app.use(routes);




port = process.env.PORT;
app.listen(port , console.log(`app working on port ${port}`))