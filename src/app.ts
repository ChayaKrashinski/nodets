import mongoose from 'mongoose';
import express from 'express';
// import userRoutes from './routes/user.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import connectDB from './db/db';
import errorHandler from './middlewares/errorHandler';
import notFoundHandler from './middlewares/notFoundHandler';
import {router as userController} from './controllers/user.controller';

connectDB(); 
const app = express();
const PORT = 3000;

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'Documentation for your API endpoints',
        },
        securityDefinitions: {
            apiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
            },
        },
    }, apis: [path.resolve(__dirname, './controllers/*.ts')],
    security: [{ apiKeyAuth: [] }],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/users', userController);
app.use(errorHandler);
app.use(notFoundHandler)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
