var User=require('../models/user');

//注册
exports.signup=function(req,res){
	var _user=req.body.user
	User.find({name:_user.name},function(err,user){
		if(err){
			console.log(err)
		}
		console.log(user)
		if(user.length>0){
			return res.redirect('./signin')
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
	
}

//登录页面
exports.showSignin=function(req,res){
	res.render('signin',{
		title:'登录页面'
	})
}

//注册页面
exports.showSignup=function(req,res){
	res.render('signup',{
		title:'注册页面'
	})
}


//登录
exports.signin=function(req,res){
	var _user=req.body.user
	var name=_user.name;
	var password=_user.password;

	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err)
		}
		if(!user){
			return res.redirect('user/signup')
		}

		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err)
			}

			if(isMatch){
				req.session.user=user
				return res.redirect('/')
			}else{
				return res.redirect('user/signin')
				console.log('密码错误')
			}
		})
	})
	
}

//登出
exports.logout=function(req,res){
	delete req.session.user
	//delete app.locals.user

	res.redirect('/')
}

//用户列表
exports.list=function(req,res){
	var user =req.session.user;
	User.fetch(function(err,users){
		res.render('userlist',{
			users:users
		})
	})
}

//中间件
//登录验证
exports.signinRequired=function(req,res,next){
	var user=req.session.user;
	console.log(user)
	if(!user){
		return res.redirect('/user/signin')
	}
	
	next();
}

//权限验证
exports.permissionRequired=function(req,res,next){
	var user=req.session.user;
	if(user.usergroup<2){
		return res.send('权限不足')
	}

	next();
}