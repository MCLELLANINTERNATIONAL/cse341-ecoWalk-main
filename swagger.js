const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'ecoWalk API',
        description: 'API documentation for coastal hikes and trails'
    },
    host: 'localhost:300',
    schemes: ['http', 'https'],
};

const outputFile = './swagger.json';

// IMPORTANT: include ALL your route files here
const endpointsFiles = ['./server.js'];

// Generates swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);