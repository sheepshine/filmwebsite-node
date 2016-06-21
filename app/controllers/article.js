var Article=require('../models/article');
var Comment=require('../models/comment');
var User=require('../models/user');
var _=require('underscore');

exports.articleDetail=function(req,res){
	console.log(req.params)
	var id=req.params.id;

	Article.findById(id,function(err,article){
		if(err){
			console.log(err)
		}
		Comment.find({article:article._id})
			.populate('from','name')
			.exec(function(err,comments){
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
				console.log(err)
			}
			res.render('list',{
				title:'列表',
				articles:articles
			})
		})
	}else{
		Article.findByAuthor(req.session.user.name,function(err,articles){
			if(err){
				console.log(err)
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