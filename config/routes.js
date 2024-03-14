//first step
const express = require( 'express' );
const controller = require ("../controllers/funcontrol");
const registerUser = require("../controllers/registerUser")
const middleware= require ('../middleware/auth')
const router =  express.Router();

router.post('/',middleware.checkUserLogin,controller.message)
router.get('/',middleware.checkUserLogin,controller.getAllMessages)
router.post('/comments/:id',middleware.checkUserLogin, controller.comments);
router.get ('/register',registerUser.getRegisterPage);
router.post ('/sign-up', registerUser.signUp);
router.post('/log-in' , registerUser.login)
module.exports = router;