const router = require('express').Router();
const {getUserChart, getUserChartLine, getPatientChartLine, getBarChartFemalemale} = require('../controller/Chart.controller')

router.get('/',getUserChart)
router.get('/line',getUserChartLine)
router.get('/patient',getPatientChartLine)
router.get('/malefemale',getBarChartFemalemale)

module.exports = router;