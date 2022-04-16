import React from "react";
import { web3AuthProvider } from "./auth3";

export interface Auth3ProviderData {
  isAuthenticated: boolean;
  isSignedUp: boolean;
  accessToken: string;
  authError: string;
  user: VerifiedAuth3User;
} 

export interface VerifiedAuth3User {
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

export interface NewAuth3User {
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
  auth3Signup: (newUser: NewAuth3User) => Promise<Auth3ProviderData>;
  auth3Signin: (userAuthData: UserAuthData) => Promise<Auth3ProviderData>;
  auth3SSO: (callback: VoidFunction) => Promise<Auth3ProviderData>;
  auth3Signout: () => Promise<Auth3ProviderData>;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function SecureAuth3Provider({ children, apiKey, appId}: SecureAuth3ProviderProps) {
  let auth3Signup = async (newUser: NewAuth3User) => {
    return await web3AuthProvider.auth3Signup(newUser, apiKey);
  };

  let auth3Signin = async (userAuthData: UserAuthData) => {
    return await web3AuthProvider.auth3Signin(userAuthData, apiKey);
  };

  let auth3SSO = async () => {
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