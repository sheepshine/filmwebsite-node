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
	
}

//登出
exports.logout=function(req,res){
	delete req.session.user
	//delete app.locals.user

	res.redirect('/')
}

//用户列表
exports.list=function(req,res){
	User.fetch(function(err,users){
		res.render('userlist',{
			users:users
		})
	})
}