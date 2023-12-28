"use strict"
const User=require('./models/userModel')
const {BlogCategory,BlogPost}= require('./models/blogModel')

module.exports= async () =>{
    /* const user=await User.findOne()
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
}*/
    await User.deleteMany().then(()=> console.log(' - User Deleted All'))
    await BlogCategory.deleteMany().then(()=> console.log(' - BlogCategory Deleted All'))
    await BlogPost.deleteMany().then(()=> console.log(' - BlogPost Deleted All'))

    const user = await User.create({
        email:"test@test.com",
        password:"12345678",
        firstName:"Test",
        lastName:"Test"
    })
    const blogCategory=await BlogCategory.create({
        name: 'Test Category'
    })

    for(let key in [...Array(200)]){
        await BlogPost.create({
            userId:user._id,
            blogCategoryId:blogCategory._id,
            title:` test ${key} title`,
            content:`test ${key} content`,
            published:Boolean(key%2)
        })
    }
console.log(" * Synchronised * ")
}