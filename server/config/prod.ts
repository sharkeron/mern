import {EnvConfigInterface} from './config.interface';

module.exports = {
   port: <string>process.env.PORT,
   mongoUri: <string>process.env.MONGO_URI,
   jwtSecret: <string>process.env.JWT_SECRET,
   baseUrl: <string>process.env.BASE_URL,
} as EnvConfigInterface;
