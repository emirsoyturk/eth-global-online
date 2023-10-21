const express = require('express')
const router = express.Router()
const sentence = require('../controllers/sentence.controller')

router.post('/to/indexes', sentence.toIndexes)
router.post('/from/indexes', sentence.fromIndexes)

module.exports = router
