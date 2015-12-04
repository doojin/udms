var list = [
    require('./auth_controller'),
    require('./notification_controller'),
    require('./user_manager_controller')
];

module.exports = {};

module.exports.applyAll = function(app) {
    list.forEach(function(controller) {
        controller.apply(app);
    });
};