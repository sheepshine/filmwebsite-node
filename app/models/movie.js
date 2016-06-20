var mongoose=require('mongoose')
var MoviceSchema=require('../schemas/movie')
var Moive=mongoose.model('movie',MoviceSchema)

module.exports=Moive;