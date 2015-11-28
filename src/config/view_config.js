var handlebars = require('express-handlebars'),
    globals = require('../globals');

var viewConfig = {};

viewConfig.setUp = function(app) {

    app.set('views', globals.ROOT_DIR + 'views');
    app.set('view engine', 'handlebars');

    app.engine('handlebars', handlebars({
        layoutsDir: globals.ROOT_DIR + 'views/layouts',
        partialsDir: globals.ROOT_DIR + 'views/partials',
        defaultLayout: 'default'
    }));
};

module.exports = viewConfig;