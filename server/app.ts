import cors from 'cors';
import express, {Express, Response} from 'express';
import helmet from 'helmet';
import 'module-alias/register';
import mongoose from 'mongoose';
import path from 'path';
import AuthRoute from './routes/auth.route';
import LinkRoute from './routes/link.route';
import RedirectRoute from './routes/redirect.route';

const {config} = require('node-config-ts');

const PORT: number = config.port;
const MONGO_URI: string = config.mongoUri;

console.log(PORT);
console.log(MONGO_URI);
console.log(config.jwtSecret);
console.log(config.baseUrl);

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
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
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
