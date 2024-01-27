"use strict";

const router = require("express").Router();
const permissions=require('../middlewares/permissions')
const topping = require("../controllers/topping");
router.use(permissions.isAdmin)
router.route("/")
    .get(topping.list)
    .post(topping.create);
router.route('/:id')
    .get(topping.read)
    .put(topping.update)
    .patch(topping.update)
    .delete(topping.delete)


module.exports = router;
