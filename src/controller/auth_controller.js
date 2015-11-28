module.exports = {

    apply: function(app) {
        app.get('/', getAuth);
    }

};

function getAuth(req, res) {
    res.render('authorization');
}