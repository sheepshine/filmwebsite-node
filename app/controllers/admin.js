var Article=require('../models/article');
var Label=require('../models/label');
var log=require('../common/log');
//后台管理页
	exports.admin=function(req,res){
		res.render('admin',{
			title:'后台管理端',
			article:{
				author:"",
				title:"",
				label:[]
			},
			content:''
		})
	}

	exports.adminAdd=function(req,res){
		var author;
		req.session.user?author=req.session.user.name:author="";
		
		Label.fetch(function(err,lables){
			if(err){
				return log.error('查找文章标签失败');
			}
			res.render('admin-add',{
				title:'新增博客',
				article:{
					author:author,
					title:"",
					label:[]
				},
				lables:lables,
				content:''
			})
		})

	}

	exports.adminUpdate=function(req,res){
		var id=req.params.id;
		if(id){
			Article.findById(id,function(err,article){
				if(err){
					return log.error('查找文章失败','文章id:'+id);
				}
				Label.fetch(function(err,lables){
					if(err){
						return log.error('更新文章时查找标签失败','文章id:'+id);
					}
					res.render('admin-add',{
						title:'后台更新页',
						article:article,
						lables:lables
					})
				})
			})
		}
	}

	//admin post article
	exports.adminAddPost=function(req,res){
		var id=req.body.article._id;
		var articleObj=req.body.article;
		var _article;
		if(id!='undefined'){
			Article.findById(id,function(err,article){
				if(err){
					return log.error('更新文章时查找标签失败','文章id:'+id);
				}

				_article=_.extend(article,articleObj)
				_article.save(function(err,article){
					if(err){
						return log.error('更新文章后保存文章失败','文章id:'+id);
					}

					res.redirect('/detail/'+article._id)
				})
			})
		}else{
			_article=new Article({
				author:articleObj.author,
				title:articleObj.title,
				language:articleObj.language,
				label:articleObj.label,
				content:articleObj.content
			})

			_article.save(function(err,article){
				if(err){
					return log.error('新增文章时查找标签失败','文章信息:'+_article);
				}

				res.redirect('/detail/'+article._id)
			})
		}

	}

	

	exports.adminList=function(req,res){
		var id=req.query.id;

		if(id){
			Article.remove({_id:id},function(err,article){
				if(err){
					return log.error('查找文章列表标签失败','文章信息:'+_id);
				}else{
					res.json({success:1})
				}
			})
		}
	}

	//标签管理 
	exports.adminLabel=function(req,res){
		Label.fetch(function(err,lables){
			if(err){
				console.log(err)
			}
			res.render('label',{
				title:'标签管理',
				labels:lables
			})
		})
	}

	//添加标签
	exports.addLabel=function(req,res){
		console.log(req.body.label,'-------------------------------------------------')
		Label.findByName(req.body.label,function(err,isHas){
			if(isHas){
				res.json({state:1,message:'标签已存在'})
			}else{
				label=new Label({
					author:req.session.user.name,
					name:req.body.label
				})
				label.save(function(err,label){
					console.log('标签添加成功',label);
					res.json({state:0,message:'标签添加成功'})
				})
			}
		})
		
	}

	exports.removeLabel=function(req,res){
		var id=req.query.id;

		if(id){
			Label.remove({_id:id},function(err,lable){
				if(err){
					console.log(err)
				}else{
					res.json({success:1,message:'删除成功'})
				}
			})
		}
	}