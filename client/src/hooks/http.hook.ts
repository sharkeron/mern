import {useCallback, useState} from 'react';

declare namespace Request {
   export type RequestMethodsType = 'GET' | 'POST' | 'PUT' | 'DELETE';

   export interface Headers {
      Authorization?: string;

      [header: string]: any;
   }
}

export const useHttp = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<null | string>(null);

   const request = useCallback(async (
      url: string,
      method: Request.RequestMethodsType = 'GET',
      body?: {} | null,
      headers: Partial<Request.Headers> = {},
   ) => {
      setLoading(true);

      if (body) {
         body = JSON.stringify(body) as string;
         headers['Content-Type'] = 'application/json';
      }

      try {
         const response = await fetch(
            url,
            {
               method,
               body: body as string | null,
               headers,
            },
         );
         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
         }

         setLoading(false);

         return data;
      } catch (e) {
         setLoading(false);
         setError(e.message);
         throw e;
      }
   }, []);

   const clearError = useCallback(() => setError(null), []);

   return {
      loading,
      request,
      error,
      clearError,
   };
};
