var Index=require('../app/controllers/index')
var Admin=require('../app/controllers/admin')
var Article=require('../app/controllers/article')
var User=require('../app/controllers/user')

module.exports=function(app){
	app.use(function(req,res,next){
		var _user=req.session.user;
		console.log(_user)
		if(_user){
			app.locals.user=_user
		}
		
		return next()
		
	})

	//首页
	app.get('',Index.index)

	//注册
	app.post('/user/signup',User.signup)

	//登录
	app.post('/user/signin',User.signin)

	//登出
	app.get('/logout',User.logout)

	//用户列表
	app.get('/user/list',User.list)

	//博客详情
	app.get('/detail/:id',Article.articleDetail)


	//后台管理
	app.get('/admin',Admin.admin)

	//新增博客
	app.get('/admin/add',Admin.adminAdd)

	//修改已有博客
	app.get('/admin/updata/:id',Admin.adminUpdate)

	//发布博客
	app.post('/admin/article/new',Admin.adminAddPost)

	//获取列表
	app.get('/list',Article.articleList)

	app.delete('/admin/list',Admin.adminList)

	//标签管理 
	app.get('/admin/label',Admin.adminLabel)

	//添加标签
	app.post('/admin/label',Admin.addLabel)


}

