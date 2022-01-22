import { ethers } from "ethers";
import { SigResult } from "./signature-interface";

export interface ActionData {
    actionType: string;
    verificationType: string;
    networkName: string;
    provider: string;
    networkScanner: string;
    signature: SigResult | null;
    email: string;
    firstName?: string;
    lastName?: string;
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
    EIP712 = 'EIP712',
}