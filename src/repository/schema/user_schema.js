var mongoose = require('mongoose'),
    roleSchema = require('./role_schema');

var options = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: {
        createdAt: 'created'
    }
};

var userSchema = new mongoose.Schema({
    userID: String,
    userIDLowercase: String,
    password: String,
    role: roleSchema,
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    lastActive: Date
}, options);

userSchema.virtual('ID').get(function() {
    return this.id;
});

userSchema.virtual('ID').set(function(id) {
    this.id = id;
});

module.exports = userSchema;