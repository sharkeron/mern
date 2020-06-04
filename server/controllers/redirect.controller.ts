import {Request, Response} from 'express';
import Link from '../models/link.model';
import {errorHandler500} from '../utils/errorHandler';

export const RedirectLinkCtrl = async (req: Request, res: Response): Promise<void> => {
   try {
      const link = await Link.findOne({code: req.params.code});

      if (link) {
         link.clicks++;
         await link.save();

         res.redirect(link.from);

         return;
      }

      res.status(404)
         .json('Link not found');
   } catch (e) {
      errorHandler500(res);
   }
};
