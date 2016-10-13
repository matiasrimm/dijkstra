var Resource = require('resourcejs');
module.exports = function(app, route) {

  // Setup the controller for REST;
  Resource(app, '', route, app.models.city).rest();

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};


/*
var restful = require('node-restful');
module.exports = function (app, route) {
  var rest = restful.model(
    'city',
    app.models.city
  ).methods(['get', 'put', 'post', 'delete']);

  rest.register(app, route);

  return function (req, res, next) {
    next();
  }
};
*/
