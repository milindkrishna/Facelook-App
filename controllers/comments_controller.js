const Comment = require('../models/comment');

const Post = require('../models/post')

module.exports.create = async function(req,res){
    try {
        let post = await Post.findById(req.body.post);
        if (post){

            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,    // post._id
                user: req.user._id
            });
                // updating
                post.comment.push(comment);
                // and then save
                post.save();
                req.flash('success','Comment Added Successfully')
                res.redirect('/');

        }
    } catch (error) {
            console.log('Error',error);
            return;
        }

}



module.exports.destroy = async function(req,res){
    try {
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            
            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, {$pull : {comment: req.params.id}});

            req.flash('success','Comment deleted Successfully')
            return res.redirect('back')
            } else {
            return res.redirect('back')   
        }
    } catch (error) {
        console.log('Error',error);
        return;
    }
}