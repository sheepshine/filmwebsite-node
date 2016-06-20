var _=require('underscore');
var Article=require('../models/article');
var User=require('../models/user');
var Label=require('../models/label');

module.exports=function(app){
	app.use(function(req,res,next){
		var _user=req.session.user;
		console.log(_user)
		if(_user){
			app.locals.user=_user
		}
		
		return next()
		
	})


	app.get('',function(req,res){
		Article.fetch(function(err,articles){
			if(err){
				console.log(err)
			}
			res.render('index',{
				title:'博客',
				articles:articles
			})	
		})
	})

	//注册
	app.post('/user/signup',function(req,res){
		var _user=req.body.user
		User.find({name:_user.name},function(err,user){
			if(err){
				console.log(err)
			}
			console.log(user)
			if(user.length>0){
				return res.redirect('/')
			}else{
				var user = new User(_user)
				user.save(function(err,user){
					if(err){
						console.log(err)
					}
					req.session.user=user
					return res.redirect('/')
				})	
			}
		})
		
	})

	//登录
	app.post('/user/signin',function(req,res){
		var _user=req.body.user
		var name=_user.name;
		var password=_user.password;

		User.findOne({name:name},function(err,user){
			if(err){
				console.log(err)
			}
			if(!user){
				console.log('用户不存在')
			}

			user.comparePassword(password,function(err,isMatch){
				if(err){
					console.log(err)
				}

				if(isMatch){
					req.session.user=user
					return res.redirect('/')
				}else{
					console.log('密码错误')
				}
			})
		})
		
	})

	//登出
	app.get('/logout',function(req,res){
		delete req.session.user
		delete app.locals.user

		res.redirect('/')
	})

	//用户列表
	app.get('/user/list',function(req,res){
		User.fetch(function(err,users){
			res.render('userlist',{
				users:users
			})
		})
	})

	app.get('/detail/:id',function(req,res){
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
		
	})

	//后台管理页
	app.get('/admin',function(req,res){
		res.render('admin',{
			title:'后台管理端',
			article:{
				author:"",
				title:"",
				label:[]
			},
			content:''
		})
	})

	app.get('/admin/add',function(req,res){
		var author;
		req.session.user?author=req.session.user.name:author="";
		
		Label.fetch(function(err,lables){
			if(err){
				console.log(err)
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

	})

	app.get('/admin/updata/:id',function(req,res){
		var id=req.params.id;
		if(id){
			Article.findById(id,function(err,article){
				res.render('admin',{
					title:'后台更新页',
					article:article
				})
			})
		}
	})

	//admin post article
	app.post('/admin/article/new',function(req,res){
		var id=req.body.article._id;
		var articleObj=req.body.article;
		var _article;
		if(id!='undefined'){
			Article.findById(id,function(err,article){
				if(err){
					console.log(err)
				}

				_article=_.extend(article,articleObj)
				_article.save(function(err,article){
					if(err){
						console.log(err)
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
				console.log(article)
				if(err){
					console.log(err)
				}

				res.redirect('/detail/'+article._id)
			})
		}

	})

	app.get('/list',function(req,res){
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
	})

	app.delete('/admin/list',function(req,res){
		var id=req.query.id;

		if(id){
			Article.remove({_id:id},function(err,movie){
				if(err){
					console.log(err)
				}else{
					res.json({success:1})
				}
			})
		}
	})

	//标签管理 
	app.get('/admin/label',function(req,res){
		Label.fetch(function(err,lables){
			if(err){
				console.log(err)
			}
			res.render('label',{
				title:'标签管理',
				labels:lables
			})
		})
	})

	//添加标签
	app.post('/admin/label',function(req,res){
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
		
	})
}

