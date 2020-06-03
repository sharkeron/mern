import {useCallback, useEffect, useState} from 'react';

interface AuthHookInterface {
   token: string | null;
   userId: string | null;
   login: (jwtToken: string, id: string) => void;
   logout: () => void;
}

export const useAuth = (): AuthHookInterface => {
   const [token, setToken] = useState<null | string>(null);
   const [userId, setUserId] = useState<null | string>(null);

   const storageName = 'userData';

   const login = useCallback((jwtToken: string, id: string) => {
      setToken(jwtToken);
      setUserId(id);

      localStorage.setItem(
         storageName,
         JSON.stringify({
                           userId: id,
                           token: jwtToken,
                        }),
      );
   }, []);

   const logout = useCallback(() => {
      setToken(null);
      setUserId(null);
      localStorage.removeItem(storageName);
   }, []);

   useEffect(() => {
      const authFromStorage = localStorage.getItem(storageName);

      if (!!authFromStorage) {
         const parsedAuthData = JSON.parse(authFromStorage);

         login(parsedAuthData.token, parsedAuthData.userId);
      }
   }, [login]);

   return {
      login,
      logout,
      token,
      userId,
   };
};
