var Article=require('../models/article');
var Comment=require('../models/comment');
var User=require('../models/user');
var _=require('underscore');
var log=require('../common/log');
exports.articleDetail=function(req,res){
	log.info('访问日志');
	var id=req.params.id;

	Article.findById(id,function(err,article){
		if(err){
			return log.error('查找文章失败','文章id:'+id);
		}
		Comment.find({article:article._id})
			.populate('from','name')
			.populate('reply.from reply.to','name')
			.exec(function(err,comments){
				if(err){
					return log.error('查找文章评论失败','文章id:'+id,'评论查找id:'+article._id);
				}
				res.render('detail',{
					title:article.title,
					article:article,
					comment:comments
				})
			})
		
		
	})
	
}

exports.articleList=function(req,res){
	//是否是管理员
	if(req.session.user.usergroup>1){
		Article.fetch(function(err,articles){
			if(err){
				return log.error('管理员权限查找文章');
			}
			res.render('list',{
				title:'列表',
				articles:articles
			})
		})
	}else{
		Article.findByAuthor(req.session.user.name,function(err,articles){
			if(err){
				return log.error('非管理员权限查找文章','用户信息：'+req.session.user);
			}
			res.render('list',{
				title:'列表',
				articles:articles
			})
		})
	}
	
}

// exports.postComment=function(req,res){

// 	if(!req.session.user){
// 		res.json({message:'请先登录'})
// 	}
	
// 	Article.findById(req.query.id,function(err,article){
// 		if(err){
// 			console.log(err)
// 		}
// 		console.log(article.comment,'------------------------------')
// 	})
// }