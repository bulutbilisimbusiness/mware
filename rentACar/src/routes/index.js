"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/:

// URL: /

// document:
router.use('/documents', require('./document'))

/* ------------------------------------------------------- */
module.exports = router