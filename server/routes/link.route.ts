import {Router} from 'express';
import {GenerateCtrl, GetLinkCtrl, GetLinksCtrl} from '../controllers/link.controller';
import {AuthMiddleware} from '../middlewares/auth.middleware';

const LinkRoute = Router();

LinkRoute.post(
   '/generate',
   AuthMiddleware,
   GenerateCtrl,
);

LinkRoute.get(
   '/',
   AuthMiddleware,
   GetLinksCtrl,
);

LinkRoute.get(
   '/:id',
   AuthMiddleware,
   GetLinkCtrl,
);

export default LinkRoute;
