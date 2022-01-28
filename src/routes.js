import { Router } from 'express';

// Controllers imports
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import CategoryController from './app/controllers/CategoryController';

// Middlewares imports
import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';

const routes = new Router();

// Public routes
routes.post('/login', SessionController.session);
routes.post('/users', UserController.store);

// Protected routes
// Routes with adminMiddleware can access just a Administrator users
routes.use(authMiddleware);

// Users routes
routes.get('/users', adminMiddleware, UserController.index);
routes.get('/users/:id_user', adminMiddleware, UserController.details);
routes.put('/users/:id_user', UserController.update);
routes.delete('/users/:id_user', adminMiddleware, UserController.delete);

// Category routes
routes.post('/categories', CategoryController.store);
routes.get('/categories', adminMiddleware, CategoryController.index);
// eslint-disable-next-line prettier/prettier
routes.get('/categories/:id_category', adminMiddleware, CategoryController.details );

export default routes;
