import express, {Express} from 'express';
import mongoose from 'mongoose';

const {config} = require('node-config-ts');

const PORT: number = config.port || 5000;
const MONGO_URI: string = config.mongoUri;

const app: Express = express();

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

startConnect().then(() => null);
