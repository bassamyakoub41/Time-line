const User = require("../models/users");
const bcrypt = require( "bcrypt" );
const jwt = require ("jsonwebtoken") ; 
require("dotenv").config()
const secret = process.env.SECRET;


const getRegisterPage = (req, res) => {
 User.find()
 .then(() => res.render('register' , {err: '' , logErr: ''}) ) 
 .catch(err => console.log(err));
};


const signUp = async (req, res) => {
  console.log(req.body);
  const { username, email, password, confirmPassword } = req.body;

  if (username === '' || password === '' || email === '' || confirmPassword === '') {
      res.render('register', { err: 'You have to fill all input fields', logErr: '' });
  } else {
      if (password !== confirmPassword) {
          res.render('register', { err: 'Password and confirm password do not match', logErr: '' });
      } else {
          const user = await User.findOne({ email: email });
          if (user) {
              res.render('register', { err: 'User with this email already exists!', logErr: '' });
          } else {
              const hashedPassword = bcrypt.hashSync(password, 12);
              const newUser = new User({
                  username: username,
                  email: email,
                  password: hashedPassword
              });
              await newUser.save();
              res.render('register', { err: 'You can log in now', logErr: '' });
          }
      }
  }
}



    const login = async (req ,res)=>{
      if( req.body.password === '' || req.body.email === ''){
    res.render('register' , {err:'You have to fill all inputs fields' , logErr:''})
      }else{
        const user = await User.findOne({email:req.body.email})
        if (!user){
          res.render('register' , {logErr : "Email not found" , err:''})
        } else{
          const isCorrect = bcrypt.compareSync(req.body.password , user.password)
          if(!isCorrect){
            res.render('register' , {logErr: 'Password is not correct' , err:''})
        }else{
          const token = jwt.sign({ userId: user._id }, secret);
          res.cookie('token', token, { maxAge: 3600000 });
          // res.render('posts', { username: user.username , Msg:'' });
          res.redirect ("/")
        }
    }
  }
}
const logOut = (req, res) => {
  res.clearCookie("token");
  res.redirect("/register");
};


module.exports = {
  getRegisterPage,
  signUp,
  login,
  logOut,
};
