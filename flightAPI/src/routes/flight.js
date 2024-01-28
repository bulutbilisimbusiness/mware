"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/flight:

const permissions = require('../middlewares/permissions')
const flight = require('../controllers/flight')

// URL: /flights
router.use(permissions.isStaffOrAdmin)
router.route('/')
    .get(flight.list)
    .post(flight.create)

router.route('/:id')
    .get( flight.read)
    .put( flight.update)
    .patch( flight.update)
    .delete(permissions.isAdmin, flight.delete)

/* ------------------------------------------------------- */
module.exports = router