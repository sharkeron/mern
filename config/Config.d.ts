/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    port: number
    mongoUri: string
    jwtSecret: string
    baseUrl: string
  }
  export const config: Config
  export type Config = IConfig
}
