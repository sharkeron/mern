import {Response} from 'express';

export const errorHandler500 = (res: Response): void => res.status(500)
                                                           .json({message: 'Something went wrong, try again later.'});
