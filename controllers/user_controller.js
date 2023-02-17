const User = require('../models/user')
const fs = require('fs')
const path = require('path')
//manual process
// module.exports.profile = function(req,res,user){
//     if(req.cookies.user_id){
//         User.findById(req.cookies.user_id,function(err,user){
//             if(user){
//                 return res.render('user_profile',{
//                     title: "User Profile",
//                     user: user
//                 })
//             }
//             else{
//                 return res.redirect('/user/sign-in');
//             }
//         })

//     }else{
//         return res.redirect('/user/sign-in');
//     }    

// }

module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        })
    })
    
}

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back')
    //     })
    // }
    // else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){

        try {
            
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('Multer error',err);}
            
                //console.log(req.file);

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    // save the uploaded file 
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }

                user.save();
                return res.redirect('back');
            })


        } catch (error) {
            req.flash('error',error);
            return res.redirect('back');
        }


    }else{
        req.flash('error','Unauthorized')
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }


    return res.render('user_sign_up',{
        title:'Facelook | Sign Up'
    })
}


module.exports.signIn = function(req,res){
    // for passport authentication
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }

    return res.render('user_sign_in',{
        title:'Facelook | Sign In'
    })
}

// get the sign up data

module.exports.create = function(req,res){
    //password doesn't match confirm password
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }


    // if user already exits then it redirects to sign-in page
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing up');}
        
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in creating user while signing up');}

                return res.redirect('/user/sign-in');
            })
        }
        // otherwise signup happens
        else{
            return res.redirect('back');
        }
    })
}

// sign in and create a session for user

module.exports.createSession = function(req,res){
    //steps to authenticate manually
    //find the user
    // User.findOne({email:req.body.email},function(err,user){
    //     if(err){console.log('error in finding user in signing in');}
        
    //     // handle user found
    //     if(user){

    //         // if user found handle password which doesnt match
    //         if(user.password != req.body.password){
    //             return res.redirect('back');
    //         }
    //         // handle session creation
    //         res.cookie('user_id',user.id);
    //         return res.redirect('/user/profile');

    //     }
    //     else{
    //         // handle user not found
    //         return res.redirect('back')
    //     }
    
    // });

    // to flash messages 

    req.flash('success', 'loggedIn Successfully')
    // steps to authenticate using passport
    return res.redirect('/')

}

module.exports.destorySession = function(req,res,next){
    //res.clearCookie('user_id');
    //res.clearCookie('codeial');

    // passport inbuild function logout
    req.logout(function(err) {
        if (err) { return next(err); }
       
        return res.redirect('/');
      });
    
    req.flash('success', 'loggedOut Successfully')
    return res.redirect('/user/sign-in');
}

// async function insertPost(){
//     try {
//         await Post.insertMany({
//             content: "Hi My name is Milind Krishna and I am a Backend Developer",
//             user: User
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// insertPost();