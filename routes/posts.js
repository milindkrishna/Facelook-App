const express = require('express')

const router = express.Router();

const passport = require('passport');

const postcontroller = require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication,postcontroller.create);
router.get('/destroy/:id',passport.checkAuthentication,postcontroller.destroy)


module.exports = router;