import {Request, Response} from 'express';
import {generate} from 'shortid';
import {env} from '../config/keys';
import Link from '../models/link.model';
import {errorHandler500} from '../utils/errorHandler';

export const GenerateCtrl = async (req: Request, res: Response): Promise<void> => {
   try {

      const {baseUrl} = env;
      const {from} = req.body as { from: string; };

      const code = generate();
      const existing = await Link.findOne({from});

      if (existing) {
         res.json({link: existing});

         return;
      }

      const to = `${baseUrl}/t/${code}`;

      const link = new Link({
                               code,
                               to,
                               from,
                               owner: req.user.userId,
                            },
      );

      await link.save();

      res.status(201)
         .json({link});
   } catch (e) {
      errorHandler500(res);
   }
};

export const GetLinksCtrl = async (req: Request, res: Response): Promise<void> => {
   try {
      const links = await Link.find({owner: req.user.userId});

      res.json(links);
   } catch (e) {
      errorHandler500(res);
   }
};

export const GetLinkCtrl = async (req: Request, res: Response): Promise<void> => {
   try {
      const link = await Link.findById(req.params.id);

      res.json(link);
   } catch (e) {
      errorHandler500(res);
   }
};
