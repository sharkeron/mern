import {Router} from 'express';
import {RedirectLinkCtrl} from '../controllers/redirect.controller';

const RedirectRoute = Router();

RedirectRoute.get(
   '/:code',
   RedirectLinkCtrl,
);

export default RedirectRoute;
