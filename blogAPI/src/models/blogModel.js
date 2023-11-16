"use strict";
const mongoose=require('mongoose')
/* const nameSchema = new  mongoose.Schema({
    fieldName: {
        type:String,
        default:null,
        trim:true,
        select:true,
        index:false,
        unique:false,
        required: [ture,'Error-Message '],
        enum:[[0,1,2,3],'Error-Message'],
        validate:[function(data){return true},'Error-Message'],
        get:function(data){return true},
        set:function(data){return data},

    }
},{
    collation:'collectionName',
    timestamps:true,

}) */

const blogPostShema= new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim:true
    },
    content:{
        type: String,
        required: true,
        trim:true
    },
    published:{
        type: Boolean,
        default: true
    }

},{
    collection:'blogPosts',timestamps:true
})

//const BlogPostModel=mongoose.model('BlogPost',blogPostShema)

module.exports={
    BlogPost:mongoose.model('BlogPost',blogPostShema)

}