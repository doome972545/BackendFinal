const router = require('express').Router();
const {loginAdmin,getDoctorAdminNurse,changStatus,sortUser, selectDoctor,mypatient, getById, searchUser, searchPatient, updateUserOnline} =require('../controller/admin.controller')
const {verifyTokenAndAdmin, updateUserLastOnline} = require('../middleware/verifyToken')
router.post('/',loginAdmin )
router.get('/',verifyTokenAndAdmin,getDoctorAdminNurse )
router.post('/changeStatus',verifyTokenAndAdmin,changStatus )
router.post('/sort',verifyTokenAndAdmin,sortUser )
router.get('/selectDoctor',selectDoctor )
router.get('/mypatient/:id',mypatient )
router.get('/user/:id',getById )
router.get('/search',searchUser )
router.get('/searchPatient',searchPatient )

// router.post('/:id',addPatient )
// router.post('/cancel/:id',cancelPatient )

module.exports = router;