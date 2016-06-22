var Article=require('../models/article');
var log=require('../common/log');
exports.index=function(req,res){
	log.trace('访问主页')
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

