var service = {};

service.LINK_COUNT = 5;
service.FIRST_PAGE = 1;
service.PER_PAGE = 15;

service.createPagination = function(records, perPage, current) {
    var pagination = {};

    pagination.min = 1;
    pagination.max = service._calculateMaxPage(records, perPage);
    pagination.current = current;
    pagination.perPage = perPage;

    var borders = service._calculateInterval(current, pagination.max);

    pagination.pages = service._calculatePages(borders);
    pagination.shouldDisplay = service._shouldDisplay(borders);
    pagination.margins = service._calculateMargins(borders, pagination.max);

    return pagination;
};

service.skippedRecords = function(req) {
    var perPage = req.pagination.perPage,
        current = req.pagination.current;

    return perPage * (current - 1);
};

service.validatePage = function(records, perPage, current) {
    current = parseInt(current);
    if (isNaN(current)) return 1;

    if (current < service.FIRST_PAGE) return service.FIRST_PAGE;

    var max = this._calculateMaxPage(records, perPage, current);
    if (current > max) return max;

    return current;
};

service.validatePerPage = function(perPage) {
    perPage = parseInt(perPage);
    var available = [5, 10, 15, 25, 50, 100];

    return available.indexOf(perPage) > -1 ? perPage : service.PER_PAGE;
};

service._calculateMaxPage = function(records, perPage) {
    return Math.ceil(records / perPage);
};

// People with weak psychics should stay away from monitor now
service._calculateInterval = function(current, maxPage) {
    var minPage = 1;
    var minLeft = minPage + 1;
    var maxRight = maxPage - 1;

    var left = current - Math.floor(service.LINK_COUNT / 2);
    if (left < minLeft) left = minLeft;

    var right = left + service.LINK_COUNT - 1;
    if (right > maxRight) right = maxRight;

    var displayed = right - left + 1;
    left -= service.LINK_COUNT - displayed;
    if (left < minLeft) left = minLeft;

    return { 'left': left, 'right': right };
};

service._calculateMargins = function(visible, max) {
    return {
        left: visible.left > 2,
        right: visible.right < max - 1
    };
};

service._shouldDisplay = function(visible) {
    return visible.left < visible.right;
};

service._calculatePages = function(borders) {
    var links = [];
    for (var i = borders.left; i <= borders.right; i++) links.push(i);
    return links;
};

module.exports = service;