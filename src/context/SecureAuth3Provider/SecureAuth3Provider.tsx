import React from "react";
import { web3AuthProvider } from "./auth3";

export interface Auth3ProviderData {
  isAuthenticated: boolean;
  isSignedUp: boolean;
  accessToken: string;
  authError: string;
  user: {
    account: string;
    email: string;
    dappName: string;
    firstName: string;
    lastName: string;
    ens: string;
    chainId: number;
    permissionType: string;
    permissionFlags: number;
    lastLogin: number;
  }
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

export interface AuthContextType {
  auth3Signup: (newUser: NewUser) => Promise<Auth3ProviderData>;
  auth3Signin: (userAuthData: UserAuthData) => Promise<Auth3ProviderData>;
  auth3SSO: (callback: VoidFunction) => Promise<Auth3ProviderData>;
  auth3Signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function SecureAuth3Provider({ children, apiKey, appId}: SecureAuth3ProviderProps) {
  let auth3Signup = async (newUser: NewUser) => {
    console.log('current state:', web3AuthProvider.authProviderData);
    return await web3AuthProvider.auth3Signup(newUser, apiKey);
  };

  let auth3Signin = async (userAuthData: UserAuthData) => {
    console.log('current state:', web3AuthProvider.authProviderData);
    return await web3AuthProvider.auth3Signin(userAuthData, apiKey);
  };

  let auth3SSO = async () => {
    console.log('current state:', web3AuthProvider.authProviderData);
    return await web3AuthProvider.auth3SSO(apiKey);
  };

  let auth3Signout = async () => {
    return await web3AuthProvider.auth3Signout(apiKey);
  };


  let value = { auth3Signup, auth3Signin, auth3SSO, auth3Signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}