module.exports = function(script) {
    return function(req, res, next) {
        script = '/js/' + script;
        res.locals.mainScript = script;
        next();
    };
};