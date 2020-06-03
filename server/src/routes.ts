import express from 'express'

import PointsController from './controllers/PointsControllers';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

// index, show, create, update, delete 

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);

export default routes;