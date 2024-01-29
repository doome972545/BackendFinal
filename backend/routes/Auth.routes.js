const router = require('express').Router();
const {createUser,login} = require('../controller/auth.controller')

router.post('/create',createUser)
router.post('/login',login)

module.exports = router;