var list = [
    require('./auth_controller')
];

module.exports = {};

module.exports.applyAll = function(app) {
    list.forEach(function(controller) {
        controller.apply(app);
    });
};