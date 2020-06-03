import {compare, hash} from 'bcryptjs';
import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {sign} from 'jsonwebtoken';
import User from '../models/user.model';
import {errorHandler500} from '../utils/errorHandler';

interface AuthRequestBodyInterface {
    email: string;
    password: string;
    remember?: boolean;
}

const {config} = require('node-config-ts');

export const SignUpCtrl = async (req: Request, res: Response) => {
    try {
        if (isAuthValidationErrorsExist(req, res)) {
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

export const SignInCtrl = async (req: Request, res: Response) => {
    try {
        if (isAuthValidationErrorsExist(req, res)) {
            return;
        }

        const {email, password, remember} = req.body as AuthRequestBodyInterface;

        const user = await User.findOne({email});

        if (!user) {
            res.status(400)
                .json({message: `User not found`});

            return;
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            res.status(400)
                .json({message: `Invalid data`});

            return;
        }

        const token = await sign({userId: user.id}, config.jwtSecret, {
            expiresIn: remember ? '30d' : '1h',
        });

        res.json({
            token,
            userId: user.id,
        });

    } catch (e) {
        errorHandler500(res);
    }
};

function isAuthValidationErrorsExist(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400)
            .json({
                errors: errors.array(),
                message: 'Invalid data',
            });

        return true;
    }

    return false;
}
