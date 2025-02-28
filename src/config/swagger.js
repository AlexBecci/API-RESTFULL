const path = require('path');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Registers API',
            description: 'API para la gestión de registros',
            version: '1.0.0'
          
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Servidor local'
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                BearerAuth: []
            }
        ],
    },
    apis: [path.resolve(__dirname, '../routes/register.routes.js')]
};




module.exports = { swaggerOptions }
