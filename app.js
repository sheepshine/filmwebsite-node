var express=require('express');
var app=express();
var path=require('path');
var mongoose=require('mongoose');
var bodyParser  = require('body-parser');
var _=require('underscore');
var Movie=require('./models/movie')
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/ycb')

app.set('views','./views/pages');
app.set('view engine','jade');
//app.user(express.bodyParser());
app.use(express.static(path.join(__dirname,'public')))


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port);

app.get('',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('index',{
			title:'电影',
			movies:movies
		})	
	})
})

app.get('/detail/:id',function(req,res){
	console.log(req.params)
	var id=req.params.id;

	Movie.findById(id,function(err,movie){
		if(err){
			console.log(err)
		}
		res.render('detail',{
			title:movie.title,
			movie:movie
		})
	})
	
})

app.get('/admin',function(req,res){
	res.render('admin',{
		title:'后台录入',
		movie:{
			doctor:"",
			title:"",
			language:"",
			country:"",
			summary:"",
			year:"",
		}
	})
})

app.get('/admin/updata/:id',function(req,res){
	var id=req.params.id;
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'后台更新页',
				movie:movie
			})
		})
	}
})

//admin post movie
app.post('/admin/movie/new',function(req,res){
	var id=req.body.movie._id;
	var movieObj=req.body.movie;
	var _movie;
	if(id!='undefined'){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}

			_movie=_.extend(movie,movieObj)
			_movie.save(function(err,movie){
				if(err){
					console.log(err)
				}

				res.redirect('/detail/'+movie._id)
			})
		})
	}else{
		_movie=new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			language:movieObj.language,
			country:movieObj.country,
			summary:movieObj.summary,
			year:movieObj.year
		})

		_movie.save(function(err,movie){
			console.log(movie)
			if(err){
				console.log(err)
			}

			res.redirect('/detail/'+movie._id)
		})
	}

})

app.get('/list',function(req,res){
	Movie.fetch(function(err,movies){
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
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err)
			}else{
				res.json({success:1})
			}
		})
	}
})

