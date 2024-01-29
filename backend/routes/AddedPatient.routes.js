const router  = require('express').Router();
const {added,cancelPatient} = require('../controller/addPatient.controller')

router.post('/',added )
router.post('/cancel/:id',cancelPatient )

module.exports = router;