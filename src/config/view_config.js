var handlebars = require('express-handlebars'),
    globals = require('../globals');

var viewConfig = {};

viewConfig.setUp = function(app) {

    var hbs = handlebars.create({
        layoutsDir: globals.ROOT_DIR + 'views/layouts',
        partialsDir: globals.ROOT_DIR + 'views/partials',
        defaultLayout: 'default',
        helpers: {
            equal: function(val1, val2, options) {
                if (val1 == val2) return options.fn(this);
                return options.inverse(this);
            }
        }

    });

    app.set('views', globals.ROOT_DIR + 'views');
    app.set('view engine', 'handlebars');

    app.engine('handlebars', hbs.engine);
};

module.exports = viewConfig;