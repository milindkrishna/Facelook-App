const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

//console.log('Home Controller based Router Loaded');

router.get('/',homeController.home);

// routes for user controller to get profile [/user/profile] and so on
// router.use('/routerName', require('./routerfile));

router.use('/user',require('./user'));

router.use('/posts',require('./posts'));

router.use('/comments',require('./comments'));

router.use('/api',require('./api'))

module.exports=router;