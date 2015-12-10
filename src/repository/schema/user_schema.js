var mongoose = require('mongoose'),
    roleSchema = require('./role_schema');

var options = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};

var userSchema = new mongoose.Schema({
    userID: String,
    userIDLowercase: String,
    password: String,
    role: roleSchema,
    group: String
}, options);

userSchema.virtual('ID').get(function() {
    return this.id;
});

userSchema.virtual('ID').set(function(id) {
    this.id = id;
});

module.exports = userSchema;