// module.exports.actionName = function(req,res){}
const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')


module.exports.home = async function(req,res){
    
    // to change the value of cookie
    //res.cookie('username',1199)

    // to see cookie in log after refreshing the browser
    //console.log(req.cookies);

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:'Home',
    //         posts: posts
    //     })
    // })



    try {
        // populate each post and comment (multiple populate)

    // Post(model) -> user, comment -> user
   let posts = await Post.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
       path:'comment',
       populate: {
           path:'user'
       }
   });
   
   let user = await User.find({});
   return res.render('home',{
       title:'FaceLook | Home',
       posts: posts,
       all_users : user
   }); 
    } catch (error) {
        console.log('Error is ',error);
        return;
    }
};

