const express     = require('express');
// const path        = require('path');
const queryRouter  = require('./query');
// const swaggerDocs = require('../../swagger.json');
// const swaggerUi   = require('swagger-ui-express');

const mountRoutes = (app) => {
  app.use('/', queryRouter);  

 
};

module.exports = mountRoutes;