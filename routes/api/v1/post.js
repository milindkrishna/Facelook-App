const express = require('express');

const router = express.Router();

const passport = require('passport')

const jwt = require('jsonwebtoken')

const postApi = require('../../../controllers/api/v1/postapi')

router.get('/',postApi.index)
router.delete('/:id',passport.authenticate('jwt',{session: false}),postApi.destroy)

module.exports = router;