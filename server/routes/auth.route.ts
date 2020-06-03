import {IRouter, Router} from 'express';
import {check} from 'express-validator';
import {SignInCtrl, SignUpCtrl} from '../controllers/auth.controller';

const authRoute: IRouter = Router();

authRoute.post(
   '/sign_up',
   [
      check('email', 'Invalid email')
         .isEmail(),
      check('password', 'Min length of password is 6 char')
         .isLength({min: 6}),
   ],
   SignUpCtrl,
);

authRoute.post(
   '/sign_in',
   [
      check('email', 'Invalid email')
         .normalizeEmail()
         .isEmail(),
      check('password', 'Password is required')
         .exists(),
   ],
   SignInCtrl,
);

export default authRoute;
