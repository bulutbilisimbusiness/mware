"use strict"

const router=require('express').Router()

// auth:
router.use('/auth', require('./auth'))
// users
router.use('/users', require('./user'))
// flights
router.use('/flights', require('./flight'))
// passengers
router.use('/passengers', require('./passenger'))
// reservations
router.use('/reservations', require('./reservation'))
// document:
router.use('/documents', require('./document'))

module.exports=router