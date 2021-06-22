const routes = require('next-routes')();

routes.add('/managers/new', '/managers/new');
routes.add('/managers/:address', '/managers/show');
module.exports = routes;