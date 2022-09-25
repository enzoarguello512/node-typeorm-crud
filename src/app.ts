import express from 'express';
import debug from 'debug';
import cors from 'cors';
import helmet from 'helmet';
import logsMiddleware from './components/app/middleware/logs.middleware';
import ErrorMiddleware from './components/app/middleware/error.middleware';
import ErrorHandler from './common/error.handler.config';
import http from 'http';
import { corsOptions } from './components/app/middleware/cors.middleware';
import vehiclesRouter from './components/vehicle/vehicle.routes.config';
import brandsRouter from './components/brand/brand.routes.config';
import colorsRouter from './components/color/color.routes.config';

// App

const app: express.Application = express();
const debugLog: debug.IDebugger = debug('app');

// Middlewares

// custom middleware logger
app.use(logsMiddleware);

// built-in middleware for json
app.use(express.json());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(helmet());

// Routes config
app.use('/api/vehicle', vehiclesRouter);
app.use('/api/brand', brandsRouter);
app.use('/api/color', colorsRouter);

// Errors
app.use(ErrorMiddleware.handle);
// Manage non-existent routes
app.use(ErrorMiddleware.routeNotFound);

process.on('uncaughtException', async (error: Error): Promise<void> => {
  ErrorHandler.handleError(error);
  if (!ErrorHandler.isTrustedError(error)) process.exit(1);
});
process.on('unhandledRejection', (reason: Error): never => {
  throw reason;
});

// Server
const httpServer: http.Server = http.createServer(app);
debugLog('Configured main application');

export default httpServer;
