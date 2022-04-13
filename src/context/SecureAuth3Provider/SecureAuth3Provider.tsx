import React from "react";
import { ButtonProps } from "../../components/Button/Button";
import { FormProps } from "../../components/Form/Form";
import { web3AuthProvider } from "./auth3";

export interface AuthContextType {
  auth3Signup: (userAuthData: FormProps | ButtonProps, callback: VoidFunction) => void;
  auth3Signin: (userAuthData: FormProps| ButtonProps, callback: VoidFunction) => void;
  auth3SSO: (callback: VoidFunction) => void;
  auth3Signout: (callback: VoidFunction) => void;
}

export interface AuthData {
  address: string;
  signature: string;
  message: string;
  email: string;
}

export interface SecureAuth3ProviderProps {
  children: React.ReactNode;
  apiKey: string;
  appId: string;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function SecureAuth3Provider({ children, apiKey, appId}: SecureAuth3ProviderProps) {

  let auth3Signup = (newUser: FormProps | ButtonProps, callback: VoidFunction) => {
    return web3AuthProvider.auth3Signup(newUser, apiKey, () => {
      callback();
    });
  };

  let auth3Signin = (newUser: FormProps | ButtonProps, callback: VoidFunction) => {
    return web3AuthProvider.auth3Signin(newUser, apiKey, () => {
      if (web3AuthProvider.isAuthenticated) {
        // dispatch(setUser(web3AuthProvider.user));
        // dispatch(setAccesToken(web3AuthProvider.accessToken));
      }
      callback();
      });
  };

  let auth3SSO = (callback: VoidFunction) => {
    return web3AuthProvider.auth3SSO(apiKey, () => {
      if (web3AuthProvider.isAuthenticated) {
        // dispatch(setUser(web3AuthProvider.user));
        // dispatch(setAccesToken(web3AuthProvider.accessToken));
      }
      callback();
    });
  };

  let auth3Signout = (callback: VoidFunction) => {
    return web3AuthProvider.auth3Signout(apiKey, () => {
      // dispatch(signOutAccount());
      callback();
    });
  };

  let value = { auth3Signup, auth3Signin, auth3SSO, auth3Signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}