// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// // Swagger definition
// const swaggerDefinition = {
//     openapi: '3.0.0',
//     info: {
//       title: 'Course and Event API',
//       version: '1.0.0',
//       description: 'API documentation for Courses and Events',
//     },
//     servers: [
//       {
//         url: '${process.env.REACT_APP_API_URL}', 
//         description: 'Development server',
//       },
//     ],
//   };
  
//   // Options for the swagger docs
//   const options = {
//     swaggerDefinition,
//     apis: ['./api/*.js', './controllers/*.js'], 
//   };
  
//   // Initialize swagger-jsdoc
//   const swaggerSpec = swaggerJSDoc(options);
  
//   module.exports = swaggerSpec;