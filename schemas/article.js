var mongoose=require('mongoose')

var ArticleSchema=new mongoose.Schema({
	author:String,
	title:String,
	label:[],
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

ArticleSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt=this.meta.updataAt=Date.now();
	}else{
		this.meta.updataAt=Date.now();
	}

	next()
})

ArticleSchema.statics={
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
	},
	findByTitle:function(title,cb){
		return this
			.findOne({title:title})
			.exec(cb)
	},
}

module.exports=ArticleSchema