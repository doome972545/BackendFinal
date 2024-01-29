const router = require('express').Router();
const {readUser, readUserId,myrecommend, listCommend}= require('../controller/user.controller')
const {verifyToken,verifyTokenAndAdmin,verifyTokenNurseAndDoctor} = require('../middleware/verifyToken')

router.get('/',readUser)
router.get('/:id',readUserId)
router.post('/myrecommend/:id',myrecommend)
router.get('/listcommend/:id',listCommend)


module.exports = router;