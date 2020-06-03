import {createContext} from 'react';

interface AuthContextInterface {
   token: string | null;
   userId: string | null;
   login: (jwtToken: string, userId: string) => void;
   logout: () => void;
   isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextInterface>({
                                                                  token: null,
                                                                  userId: null,
                                                                  login: (jwtToken: string, userId: string) => {
                                                                  },
                                                                  logout: () => {
                                                                  },
                                                                  isAuthenticated: false,
                                                               });
