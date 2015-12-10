module.exports = function(script) {
    return function(req, res, next) {
        res.locals.mainScript = '/js/' + script;
        next();
    };
};