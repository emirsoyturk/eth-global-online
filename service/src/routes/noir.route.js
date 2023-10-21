const express = require('express')
const router = express.Router()
const noir = require('../controllers/noir.controller')

router.post('/prove', noir.prove)
router.post('/verify', noir.verify)

module.exports = router
