const router = require('express').Router();
const {createTelemed,getTelemed,date} = require('../controller/telemed.constroller')

router.post('/:id',createTelemed)
router.get('/:id',getTelemed)
router.get('/:id/:date',date)

module.exports = router;