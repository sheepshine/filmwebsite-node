var Comment=require('../models/comment');

exports.save=function(req,res){
	var _comment=req.body.comment
	console.log(req.session.user,'/////////////////////')
	var articleId=_comment.article
	_comment.from=req.session.user._id
	console.log(_comment,'-----------------------------------------------------')
	var comment=new Comment(
		_comment
	)

	comment.save(function(err,comment){
		if(err){
			console.log(err)
		}

		res.redirect('/detail/'+articleId)
	})


}

