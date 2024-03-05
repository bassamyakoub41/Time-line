//first step
const express = require( 'express' );
const controller = require ("../controllers/funcontrol")
const router =  express.Router();

router.post('/',controller.message)
router.get('/',controller.getAllMessages)
router.post('/comments/:id', controller.comments);
module.exports = router;