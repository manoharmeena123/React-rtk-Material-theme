import { useContext } from 'react';

import type { AuthContextType as AmplifyAuthContextType } from 'src/contexts/auth/amplify-context';
import type { AuthContextType as Auth0AuthContextType } from 'src/contexts/auth/auth0-context';
import type { AuthContextType as FirebaseAuthContextType } from 'src/contexts/auth/firebase-context';
import type { AuthContextType as JwtAuthContextType } from 'src/contexts/auth/jwt-context';
import { AuthContext } from 'src/contexts/auth/jwt-context';

type AuthContextType =
  | AmplifyAuthContextType
  | Auth0AuthContextType
  | FirebaseAuthContextType
  | JwtAuthContextType;

export const useAuth = <T = AuthContextType>() => useContext(AuthContext) as T;
