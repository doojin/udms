var paginationService = require('../../service/pagination_service');

module.exports = function(entity, viewVar) {
    return function(req, res, next) {
        var current = req.params.page ? req.params.page : paginationService.FIRST_PAGE;
        var perPage = req.params.perPage ? req.params.perPage : paginationService.PER_PAGE;

        entity.count()
            .then(function(count) {
                perPage = paginationService.validatePerPage(perPage);
                current = paginationService.validatePage(count, perPage, current);

                var pagination = paginationService.createPagination(count, perPage, current);
                req.pagination = pagination;
                if (pagination.shouldDisplay) {
                    res.locals[viewVar] = pagination;
                }
                next();
            });
    };
};