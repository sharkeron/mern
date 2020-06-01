import {Response} from 'express';

export const errorHandler500 = (res: Response) => res.status(500)
                                                     .json({message: 'Something went wrong, try again later.'});
