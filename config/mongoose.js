const mongoose = require( 'mongoose' );
require('dotenv').config();
url = process.env.PASSWORD;

mongoose.connect(`${url}`)
.then(() => console.log("we connected to MongoDB"))
.catch((err) => console.error(err));





module.exports = mongoose


