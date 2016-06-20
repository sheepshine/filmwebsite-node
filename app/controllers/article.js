var Article=require('../models/article');
var _=require('underscore');

exports.articleDetail=function(req,res){
	console.log(req.params)
	var id=req.params.id;

	Article.findById(id,function(err,article){
		if(err){
			console.log(err)
		}
		res.render('detail',{
			title:article.title,
			article:article
		})
	})
	
}

exports.articleList=function(req,res){
	Article.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		console.log(movies)
			res.render('list',{
			title:'列表',
			movies:movies
		})
	})
}