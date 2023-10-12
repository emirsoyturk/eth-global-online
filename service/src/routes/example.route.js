const express = require('express')
const router = express.Router()
const example = require('../controllers/example.controller')

router.get('/', example.get)

module.exports = router
