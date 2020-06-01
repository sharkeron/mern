import User from '@server/models/User';
import {errorHandler500} from '@server/utils/errorHandler';
import {compare, hash} from 'bcryptjs';
import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {sign} from 'jsonwebtoken';
import {config} from 'node-config-ts';

interface AuthRequestBodyInterface {
   email: string;
   password: string;
   rememberMe?: boolean;
}

export const signUpController = async (req: Request, res: Response) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         res.status(400)
            .json({
                     errors: errors.array(),
                     message: 'Invalid data',
                  });

         return;
      }

      const {email, password} = req.body as AuthRequestBodyInterface;

      const candidate = await User.findOne({email});

      if (candidate) {
         res.status(400)
            .json({message: `User existed`});

         return;
      }

      const hashedPassword = await hash(password, 12);

      const user = new User({
                               email,
                               password: hashedPassword,
                            });
      await user.save();

      res.status(201)
         .json({message: 'User created'});

   } catch (e) {
      errorHandler500(res);
   }
};

export const signInController = async (req: Request, res: Response) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         res.status(400)
            .json({
                     errors: errors.array(),
                     message: 'Invalid data',
                  });

         return;
      }

      const {email, password, rememberMe} = req.body as AuthRequestBodyInterface;

      const user = await User.findOne({email});

      if (!user) {
         res.status(400)
            .json({message: `User not found`});

         return;
      }

      const hashedPassword = await hash(password, 12);
      const isMatch = await compare(hashedPassword, user.password);

      if (!isMatch) {
         res.status(400)
            .json({message: `Invalid data`});

         return;
      }

      const token = await sign({userId: user.id}, config.jwtSecret, {
         expiresIn: rememberMe ? '30d' : '1h',
      });

      res.status(201)
         .json({
                  token,
                  userId: user.id,
               });

   } catch (e) {
      errorHandler500(res);
   }
};
