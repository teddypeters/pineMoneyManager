const routes = require('next-routes')();

routes.add('/managers/new', '/managers/new');
routes.add('/managers/:address', '/managers/show');
routes.add('/managers/:address/requests', '/managers/requests/index');
routes.add('/managers/:address/requests/new', '/managers/requests/new');

module.exports = routes;