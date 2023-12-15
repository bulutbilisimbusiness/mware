"use strict";
const mongoose=require('mongoose')


const blogCategorySchema=new mongoose.Schema({

    name:{
        type: String,
        trim:true,
        required:true,
    }
},{
    collection:'blogCategories',
    timestamps:true
})


const blogPostShema= new mongoose.Schema({

    userId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User",
    },
    blogCategoryId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"BlogCategory",
    },
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
    BlogCategory:mongoose.model('BlogCategory',blogCategorySchema),
    BlogPost:mongoose.model('BlogPost',blogPostShema)

}