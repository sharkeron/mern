import cors from 'cors';
import express, {Express, Response} from 'express';
import helmet from 'helmet';
import 'module-alias/register';
import mongoose from 'mongoose';
import path from 'path';
import {env} from './config/keys';
import AuthRoute from './routes/auth.route';
import LinkRoute from './routes/link.route';
import RedirectRoute from './routes/redirect.route';

const {port: PORT, mongoUri: MONGO_URI} = env;

console.log(`port ${PORT}`);
console.log(`mongo ${MONGO_URI}`);
console.log(`secret ${env.jwtSecret}`);
console.log(`base ${env.baseUrl}`);

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', AuthRoute);
app.use('/api/link', LinkRoute);
app.use('/t', RedirectRoute);

if (process.env.NODE_ENV === 'production') {
   app.use('/', express.static(path.join(__dirname, 'client')));

   app.get('*', (_, res: Response): void => {
      res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
   });
}

async function startConnect() {
   try {
      await mongoose.connect(
         MONGO_URI,
         {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
         },
      );
      app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
   } catch (e) {
      console.log(`Server error - ${e}`);
      process.exit(1);
   }
}

startConnect()
   .then(() => null);
