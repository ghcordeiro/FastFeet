import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';

import authMiddleware from './app/middlewares/auth';
import DeliverymanController from './app/controllers/DeliverymanController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientsController.store);
routes.get('/recipients', RecipientsController.index);
// routes.put('/recipients/:id', RecipientsController.update);
// routes.delete('/recipients/:id', RecipientsController.delete);

routes.post('/deliveryman', DeliverymanController.store);
routes.get('/deliveryman', DeliverymanController.index);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

export default routes;
