var mongoose=require('mongoose')

var LabelSchema=new mongoose.Schema({
	author:String,
	name:String,
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

LabelSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt=this.meta.updataAt=Date.now();
	}else{
		this.meta.updataAt=Date.now();
	}

	next()
})

LabelSchema.statics={
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
	findByName:function(name,cb){
		return this
			.findOne({name:name})
			.exec(cb)
	}
}

module.exports=LabelSchema