import React from "react";
import { web3AuthProvider } from "./auth3";

export interface AuthContextType {
  auth3Signup: (newUser: NewUser, callback: VoidFunction) => void;
  auth3Signin: (userAuthData: UserAuthData, callback: VoidFunction) => void;
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

export interface NewUser {
  account: string;
  email: string;
  firstName: string;
  lastName: string;
  ens: string;
  chainId: number;
  permissionFlag: number;
}

export interface UserAuthData {
  address:string;
  email: string;
  signature: string;
  message: string;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function SecureAuth3Provider({ children, apiKey, appId}: SecureAuth3ProviderProps) {

  let auth3Signup = (newUser: NewUser, callback: VoidFunction) => {
    return web3AuthProvider.auth3Signup(newUser, apiKey,() => {
      callback();
    });
  };

  let auth3Signin = (userAuthData: UserAuthData, callback: VoidFunction) => {
    return web3AuthProvider.auth3Signin(userAuthData, apiKey, () => {
      callback();
    });
  };

  let auth3SSO = (callback: VoidFunction) => {
    return web3AuthProvider.auth3SSO(apiKey, () => {
      callback();
    });
  };

  let auth3Signout = (callback: VoidFunction) => {
    return web3AuthProvider.auth3Signout(apiKey, () => {
      callback();
    });
  };

  let value = { auth3Signup, auth3Signin, auth3SSO, auth3Signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}