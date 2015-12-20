var mongoose = require('mongoose');

var options = {
    timestamps: {
        createdAt: 'created'
    }
};

var groupSchema = new mongoose.Schema({
    name: String,
    description: String,
    sections: [{
        title: String,
        description: String
    }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, options);

module.exports = groupSchema;