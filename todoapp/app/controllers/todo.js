"use strict";
require('express-async-errors')
const Todo= require('../models/todo')

module.exports={
    list: async(req,res)=>{
        const data=await Todo.findAndCountAll()
        res.status(200).send({
            error:false,
            result:data
        })
    },
    create:async(req,res)=>{
        const data=await Todo.create(req.body)
        res.status(201).send({
            error:false,
            body:req.body,
            message:'Created',
            result:data
        })
    }
    ,
   read: async(req,res)=>{
    const data = await Todo.findByPk(req.params.id)
    res.status(200).send({
        error:false,
        result:data
      });
  },
  update: async(req,res)=>{

    const isUpdated = await Todo.update(req.body,{where:{id:req.params.id}})
    res.status(202).send({
        error:false,
        body:req.body,
        message:'Updated',
        isUpdated:Boolean(isUpdated[0]),
        result:await Todo.findByPk(req.params.id)
    })
},
   delete: async(req,res)=>{

    const isDeleted = await Todo.destroy({where:{id:req.params.id}})
    if(isDeleted){
        res.sendStatus(204)
    }else{
        res.sendStatus(404)
    }
    
}   
}