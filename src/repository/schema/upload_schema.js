var mongoose = require('mongoose');

var options = {
    timestamps: {
        createdAt: 'created'
    }
};

var uploadSchema = new mongoose.Schema({
    publication: { type: mongoose.Schema.Types.ObjectId, ref: 'Publication' },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    files: [String]
}, options);

module.exports = uploadSchema;