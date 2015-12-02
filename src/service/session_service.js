var session = require('express-session');

var SECRET = 'V6y7vFKlaa7fyqiW';

var sessionService = {};

sessionService.bind = function(app) {
    app.use(session({
        secret: SECRET
    }));
};

module.exports = sessionService;