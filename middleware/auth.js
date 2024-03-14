const jwt  = require ("jsonwebtoken")
require("dotenv").config()
const secret = process.env.SECRET;

const checkUserLogin = (req , res , next) => {
    const token = req.cookies.token
    
    if(token){
    jwt.verify(token , secret , function(){
        if(err){
            console.log('' , err)
            res.redirect('/register');
        }else{
            req.user = decoded;
            next();
        }
    });
    }else{
        res.redirect('/register' , {err:'' , logErr:''})
    }

}

module.exports = {
    checkUserLogin
}