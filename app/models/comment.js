var mongoose=require('mongoose')
var CommentSchema=require('../schemas/comment')
var Comment=mongoose.model('comment',CommentSchema)

module.exports=Comment;