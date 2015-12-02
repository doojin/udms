module.exports = {

    apply: function(app) {
        app.get('/', getNotifications)
    }

};

function getNotifications(req, res) {
    res.render('notifications');
}