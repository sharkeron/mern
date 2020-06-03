declare namespace Express {
   interface Request {
      user: {
         userId: string;
         iat: number;
         exp: number;
      };
   }
}
