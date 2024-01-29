const { AddEvent, getEvent } = require('../controller/Calendar.Controller');

const router = require('express').Router();

router.post('/addevent/:id',AddEvent)
router.get('/event/:id',getEvent)

module.exports = router;