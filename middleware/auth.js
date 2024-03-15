const jwt  = require ("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const checkUserLogin = (req , res , next) => {
  const token = req.cookies.token
  const secret = process.env.SECRET
  if(token){
    jwt.verify(token , secret , function(err, decoded){
        if(err){
            console.log('' , err)
            res.redirect('/register');
        }else{
          res.locals.username = decoded.userInfo.username;
          console.log(decoded.userInfo.username);
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