import { ethers } from "ethers";

export interface ActionData {
    actionType: string;
    verificationType: string;
    networkName: string;
    provideType: string;
    networkScanner: string;
    signature: string;
    chainId: number;
    address: string;
    ens: string;
    email: string;
    firstName?: string;
    lastName?: string;
    message: string;
    web3Provider: ethers.providers.Web3Provider | null;
}
  
export interface ErrorMessageData {
    actionType: string;
    verificationType: string;
    message: string;
}

export const enum ACTION_TPYE {
    SIGN_UP = 'SIGN_UP',
    SIGN_IN = 'SIGN_IN'
};

export const enum Providers {
    METAMASK = 'metamask',
    WALLETCONNECT = 'wallet-connect'
}

export const enum VerifactionType {
    SIWE = 'SIWE'
}

