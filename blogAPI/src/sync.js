"use strict"
const User=require('./models/userModel')
const {BlogCategory,BlogPost}= require('./models/blogModel')

module.exports= async () =>{
    const user=await User.findOne()
    if(user){
        BlogPost.updateMany({
            "userId":{$exists:false}
        },{
            "userId":user._id
           
        }).catch(err=>console.log(err))
    }
    const blogCategory= await BlogCategory.findOne()

    if(blogCategory){
        BlogPost.updateMany({
            "blogCategoryId":{$exists:false}
        },{
            "blogCategoryId":blogCategory._id
           
        }).catch(err=>console.log(err))
    }
    console.log('* Synchronised *')
}