var express=require('express');
var app=express();
var path=require('path');
var mongoose=require('mongoose');
var bodyParser  = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var logger = require('morgan');
var port = process.env.PORT || 3000;
var dbUrl='mongodb://localhost/blog-alpha';

mongoose.connect(dbUrl)

app.set('views','./views/pages');
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

if('development'==app.get('env')){
	app.set('showStackError',true)
	app.use(logger(':method:url:status'))
	app.locals.pretty=true
	mongoose.set('debug',true)
}

require('./config/route')(app)

app.listen(port);



