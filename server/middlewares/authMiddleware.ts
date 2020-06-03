import {NextFunction, Request, Response} from 'express';
import {verify} from 'jsonwebtoken';

const {config} = require('node-config-ts');

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
   if (req.method === 'OPTIONS') {
      return next();
   }

   try {
      const token = (req.headers.authorization as string)?.split(' ')[1];

      if (!token) {
         invalidAuthentication(res);

         return;
      }

      const decoded = verify(token, config.jwtSecret);

      req.user = decoded as { userId: string; iat: number; exp: number; };
      next();
   } catch (e) {
      invalidAuthentication(res);
   }
};

function invalidAuthentication(res: Response) {
   res.status(401)
      .json({message: 'Invalid authentication'});

}
