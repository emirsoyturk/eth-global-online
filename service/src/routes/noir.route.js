const express = require('express')
const router = express.Router()
const noir = require('../controllers/noir.controller')

router.post('/prove', noir.prove)
router.post('/verify', noir.verify)
router.post('/hash', noir.hash)

module.exports = router
