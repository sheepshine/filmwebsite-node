var mongoose=require('mongoose')
var Schema=mongoose.Schema
var ObjectId=Schema.Types.ObjectId

var CommentSchema=new mongoose.Schema({
	article:{type:ObjectId,ref:'Article'},
	from:{type:ObjectId,ref:'user'},
	to:{type:ObjectId,ref:'user'},
	reply:[{
		from:{type:ObjectId,ref:'user'},
		to:{type:ObjectId,ref:'user'},
		content:String
	}],
	content:String,
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

CommentSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt=this.meta.updataAt=Date.now();
	}else{
		this.meta.updataAt=Date.now();
	}

	next()
})

CommentSchema.statics={
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

module.exports=CommentSchema