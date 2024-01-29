const router = require('express').Router();
const {saveSleepTime} = require('../controller/sleep.controller')

router.post('/:id',saveSleepTime)

module.exports = router;