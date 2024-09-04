const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Course and Event API',
      version: '1.0.0',
      description: 'API documentation for Courses and Events',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Replace with your server URL
        description: 'Development server',
      },
    ],
  };
  
  // Options for the swagger docs
  const options = {
    swaggerDefinition,
    apis: ['./routes/*.js', './controllers/*.js'], // Path to the API docs
  };
  
  // Initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);
  
  module.exports = swaggerSpec;