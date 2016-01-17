module.exports = {

    apply: function(app) {
        app.get('/', getNotifications)
    }

};

var Comment = require('../repository/entity/comment');

function getNotifications(req, res) {
    Comment.find({ $or: [{sender: req.session.auth.ID}, {receiver: req.session.auth.ID}] }, function(err, comments) {
        res.render('notifications', {comments: comments});
    });
}