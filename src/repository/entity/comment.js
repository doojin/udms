var mongoose = require('mongoose'),
    commentSchema = require('../schema/comment_schema');

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;