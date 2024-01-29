const router = require('express').Router();
const {uploadPost,showPost,removePost,editPost,getPost} = require('../controller/uploadpost')
const {upload} = require('../middleware/Upload')
const {verifyTokenAndAdmin} = require('../middleware/verifyToken')


router.post('/',verifyTokenAndAdmin,upload,uploadPost)
router.get('/',showPost)
router.get('/remove/:id',verifyTokenAndAdmin,removePost)
router.post('/edit/:id',verifyTokenAndAdmin,upload,editPost)

module.exports = router;