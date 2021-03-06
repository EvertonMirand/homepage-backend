import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/user', UserController.store);

export default routes;
