var Article=require('../models/article');

exports.index=function(req,res){
	console.log(req.session.user)
	Article.fetch(function(err,articles){
		if(err){
			console.log(err)
		}
		res.render('index',{
			title:'博客',
			articles:articles
		})	
	})
}

