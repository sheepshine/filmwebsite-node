var express=require('express');
var app=express();
var path=require('path');
var mongoose=require('mongoose');
var bodyParser  = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// var bunyan= require('bunyan');
// var log=bunyan.createLogger({
// 	name:'myapp',streams: [
//     {
//     	path: 'myapp-error.log'
//     }
//   ]});

var port = process.env.PORT || 3000;
var dbUrl='mongodb://localhost/blog-alpha';

mongoose.connect(dbUrl)



app.set('views','./app/views/pages');
app.set('view engine','jade');
//app.user(express.bodyParser());
app.use(express.static(path.join(__dirname,'public')))

app.use(session(
	{
		secret:'app',
		store:new MongoStore({
			url:dbUrl,
			collection:'sessions'
		}),
	  	saveUninitialized: true,
	  	resave:false,
	  	cookie:{maxAge:10*60*1000}
	}
));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

require('./config/route')(app)

app.listen(port);



