var mongoose=require('mongoose')
var bcrypt=require('bcryptjs')
var SALT_WORK_FACTOR=10

var UserSchema=new mongoose.Schema({
	name:{
		unique:true,
		type:String
	},
	password:String,
	usergroup:{
		type:Number,
		default:1
	},  //0 游客 //1 注册用户 //2管理员
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updataAt:{
			type:Date,
			default:Date.now()
		}
	}
})

UserSchema.pre('save',function(next){
	var user=this;
	if(this.isNew){
		this.meta.createAt=this.meta.updataAt=Date.now();
	}else{
		this.meta.updataAt=Date.now();
	}

	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
		if(err) return next(err)

		bcrypt.hash(user.password,salt,function(err,hash){
			if(err) return next(err)
			user.password=hash;
			next()
		})
	})

	
})

UserSchema.methods={
	comparePassword:function(_password,cb){
		bcrypt.compare(_password,this.password,function(err,isMatch){
			if(err) return cb(err)

			cb(null,isMatch)
		})
	}
}

UserSchema.statics={
	fetch:function(cb){
		return this
			.find({})
			.sort('meta.updataAt')
			.exec(cb)
	},
	findById:function(id,cb){
		return this
			.findOne({_id:id})
			.exec(cb)
	}
}

module.exports=UserSchema