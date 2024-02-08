"use strict"
const Reservation=require('../models/reservations')
const Car = require('../models/car')

module.exports={
    list: async (req,res)=>{
         /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "List Cars"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
       let filters={}
       if(!req.user?.isAdmin) filters.isPublish=true

       const {start:getStartDate,end:getEndDate}= req.query
       if(getStartDate && getEndDate) {
        const reservedCars= await Reservation.find({
            $nor:[
                { startDate:{$gt: getEndDate}},
                { endDate:{ $lt:getStartDate}}
            ]
        },{ _id:0,carId:1}).distinct('carId')
        if(reservedCars.length){
            filters._id={$nin:reservedCars}
        }
       }
       const data= await res.getModelList(Car,filters)

       res.status(200).send({
        error:false,
        details: await res.getModelListDetails(Car,filters),
        data
       })
    },
    create: async (req,res)=>{
         /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Create Car"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    
                }
            }
        */
       if(req?.user){
        req.body.createdId=req.user._id
        req.body.updatedId=req.user._id
       }
       const data= await Car.create(req.body)
       res.status(201).send({
        error:false,
        data
       })
    },
    read: async (req,res)=>{
         /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Get Single Car"
        */
       const data= await Car.findOne({ _id: req.params.id })
       res.status(200).send({
        error:false,
        data
       })

    },
    update: async (req,res)=>{
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Update Car"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                 
                }
            }
        */
            if(req?.user){
               
                req.body.updatedId=req.user._id
               }
        const data=    await Car.updateOne({_id: req.params.id},req.body,{runValidators:true})
        res.status(200).send({
            error:false,
            data,
            new:await Car.findOne({_id: req.params.id})
           })
    },
    delete:async (req,res)=>{
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Delete Car"
        */
       const data= await Car.deleteOne({_id: req.params.id})
       res.status(data.deletedCount ? 204: 404).send({
        error:!data.deletedCount,
        data
       })
    }

    
}