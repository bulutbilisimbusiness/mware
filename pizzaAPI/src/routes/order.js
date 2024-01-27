"use strict";

const router = require("express").Router();
const permissions=require('../middlewares/permissions')
const order = require("../controllers/order");

router.use(permissions.isLogin)

router.route("/")
    .get(order.list)
    .post(order.create);
router.route('/:id')
    .get(order.read)
    .put(order.update)
    .patch(order.update)
    .delete(permissions.isAdmin,order.delete)


module.exports = router;
