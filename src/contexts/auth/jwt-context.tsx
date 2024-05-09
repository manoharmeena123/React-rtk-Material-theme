import type { FC, ReactNode } from 'react';
import { createContext, useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { authApi } from 'src/api/auth';
import type { User } from 'src/types/user';
import { Issuer } from 'src/utils/auth';

const STORAGE_KEY = 'accessToken';

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

enum ActionType {
  INITIALIZE = 'INITIALIZE',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT'
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type SignInAction = {
  type: ActionType.SIGN_IN;
  payload: {
    user: User;
  };
};

type SignUpAction = {
  type: ActionType.SIGN_UP;
  payload: {
    user: User;
  };
};

type SignOutAction = {
  type: ActionType.SIGN_OUT;
};

type Action =
  | InitializeAction
  | SignInAction
  | SignUpAction
  | SignOutAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  SIGN_IN: (state: State, action: SignInAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  SIGN_UP: (state: State, action: SignUpAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  SIGN_OUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null
  })
};

const reducer = (state: State, action: Action): State => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

export interface AuthContextType extends State {
  issuer: Issuer.JWT;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, name: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  issuer: Issuer.JWT,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve()
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(
    async (): Promise<void> => {
      try {
        const accessToken = window.sessionStorage.getItem(STORAGE_KEY);

        if (accessToken) {
          const user = await authApi.me({ accessToken });

          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    },
    [dispatch]
  );

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = useCallback(
    async (email: string, password: string): Promise<void> => {
      const { accessToken } = await authApi.signIn({ email, password });
      const user = await authApi.me({ accessToken });

      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: ActionType.SIGN_IN,
        payload: {
          user
        }
      });
    },
    [dispatch]
  );

  const signUp = useCallback(
    async (email: string, name: string, password: string): Promise<void> => {
      const { accessToken } = await authApi.signUp({ email, name, password });
      const user = await authApi.me({ accessToken });

      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: ActionType.SIGN_UP,
        payload: {
          user
        }
      });
    },
    [dispatch]
  );

  const signOut = useCallback(
    async (): Promise<void> => {
      sessionStorage.removeItem(STORAGE_KEY);
      dispatch({ type: ActionType.SIGN_OUT });
    },
    [dispatch]
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        issuer: Issuer.JWT,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const AuthConsumer = AuthContext.Consumer;
