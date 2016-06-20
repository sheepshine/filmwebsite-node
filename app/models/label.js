var mongoose=require('mongoose')
var LabelSchema=require('../schemas/label')
var Label=mongoose.model('label',LabelSchema)

module.exports=Label;