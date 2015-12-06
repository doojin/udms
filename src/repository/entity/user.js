var mongoose = require('mongoose'),
    Role = require('../../model/role');

var options = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};

var userSchema = new mongoose.Schema({
    userID: String,
    userIDLowercase: String,
    password: String,
    role: new mongoose.Schema(
        { roleIDs: [Number] },
        { _id: false }
    )
}, options);

userSchema.virtual('ID').get(function() {
    return this.id;
});

userSchema.virtual('ID').set(function(id) {
    this.id = id;
});

var User = mongoose.model('User', userSchema);

module.exports = User;