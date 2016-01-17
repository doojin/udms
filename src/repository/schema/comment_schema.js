var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId },
    receiver: { type: mongoose.Schema.Types.ObjectId },
    publication: { type: mongoose.Schema.Types.ObjectId },
    text: String
});

module.exports = commentSchema;