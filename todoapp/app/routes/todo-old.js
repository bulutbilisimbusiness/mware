"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
const router = require('express').Router()

const Todo = require('../models/todo')

// LIST:
router.get('/', async (req, res) => {

    // const data = await Todo.findAll()
    const data = await Todo.findAndCountAll()
    res.status(200).send({
        error: false,
        result: data
    })
})

// CREATE:
router.post('/', async (req, res) => {

    const data = await Todo.create(req.body)
    res.status(201).send({
        error: false,
        body: req.body, // Send Data
        message: 'Created',
        result: data // Receive Data
    })
})

router.get('/:id',async(req,res)=>{

    const data= await Todo.findByPk(req.params.id)
    //const data= await Todo.findOne({where:{id:req.params.id}})
    res.status(200).send({
        error:false,
        result:data
    })
})
router.put('/:id',async(req,res)=>{

    const isUpdated = await Todo.update(req.body,{where:{id:req.params.id}})
    res.status(202).send({
        error:false,
        body:req.body,
        message:'Updated',
        isUpdated:Boolean(isUpdated[0]),
        result:await Todo.findByPk(req.params.id)
    })
})
router.delete('/:id',async(req,res)=>{

    const isDeleted = await Todo.destroy({where:{id:req.params.id}})
    if(isDeleted){
        res.sendStatus(204)
    }else{
        res.sendStatus(404)
    }
    
})

module.exports = router