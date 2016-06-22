var Comment=require('../models/comment');
var log=require('../common/log');
exports.save=function(req,res){
	var _comment=req.body.comment;
	var articleId=_comment.article;
	_comment.from=req.session.user._id;
	if(_comment.cid){
		Comment.findById(_comment.cid,function(err,comment){
			if(err){
				return log.error('查询评论失败','查询条件:'+_comment.cid);
			}
			var reply={
				from:_comment.from,
				to:_comment.tid,
				content:_comment.content
			}
			comment.reply.push(reply)

			comment.save(function(err,comment){
				if(err){
					return log.error('保存评论失败','文章id:'+comment);
				}
			})
			res.redirect('/detail/'+articleId)
		})
		
		
		
	}else{
		var comment=new Comment(
			_comment
		)

		comment.save(function(err,comment){
			if(err){
				return log.error('保存评论失败','评论信息:'+comment);
			}

			res.redirect('/detail/'+articleId)
		})

	}
	

	

	


}

