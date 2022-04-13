import React from "react";
import { AuthContextType } from "../../interface/auth-provider-interface";
import { ButtonProps } from "../../interface/button-interface";
import { FormProps } from "../../interface/form-interface";
import {
    useLocation,
    Navigate,
} from 'react-router-dom';

import { web3AuthProvider } from "./auth3";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAccount, setAccesToken, setUser, signOutAccount } from "../useWeb3Data/userSlice";

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }, apiKey: string) {
  const dispatch = useAppDispatch();

  let signup = (newUser: FormProps | ButtonProps, callback: VoidFunction) => {
    return web3AuthProvider.signup(newUser, () => {
      callback();
    });
  };

  let signin = (newUser: FormProps | ButtonProps, callback: VoidFunction) => {
    return web3AuthProvider.signin(newUser, () => {
      if (web3AuthProvider.isAuthenticated) {
        dispatch(setUser(web3AuthProvider.user));
        dispatch(setAccesToken(web3AuthProvider.accessToken));
      }
      callback();
      });
  };

  let singleSignin = (callback: VoidFunction) => {
    return web3AuthProvider.singleSignin(() => {
      if (web3AuthProvider.isAuthenticated) {
        dispatch(setUser(web3AuthProvider.user));
        dispatch(setAccesToken(web3AuthProvider.accessToken));
      }
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return web3AuthProvider.signout(() => {
      dispatch(signOutAccount());
      callback();
    });
  };

  let value = { signin, singleSignin, signup, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }, failRoute: string) {
  const account = useAppSelector(selectAccount); 
  let location: any = useLocation();
  let requestedPath = location.pathname;
  const failPath = `/${failRoute}`

  if (account === '') {
    return <Navigate to={failPath} state={{ from: requestedPath }} replace />;
  } else {
    return children;
  }
}