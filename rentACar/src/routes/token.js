"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/token:
const permissions=require('../middleware/permissions')
const token=require('../controllers/token')

router.use(permissions.isAdmin)
router.route('/')
    .get(token.list)
    .post(token.create)

router.route('/:id')
    .get(token.read) 
       .put(token.update)
       .patch(token.update)
       .delete(token.delete)

module.exports=router       