import {EnvConfigInterface} from './config.interface';

export const env = process.env.NODE_ENV === 'production'
                   ? require('./prod') as EnvConfigInterface
                   : require('./dev') as EnvConfigInterface;
