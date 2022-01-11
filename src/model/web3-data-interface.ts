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
}
  
export interface ErrorMessageData {
    actionType: string;
    verificationType: string;
    message: string;
}

export const enum ACTION_TPYE {
    SIGN_UP = 'SIGN_UP',
    SIGN_IN = 'SIGN_IN',
    SIGN_OUT = 'SIGN_OUT',
    CHANGE_ACCOUNT = 'CHANGE_ACCOUNT',
    CHANGE_NETWORK = 'CHANGE_NETWORK',
};

export const enum Providers {
    METAMASK = 'metamask',
}

export const enum VerifactionType {
    EIP712 = 'EIP712',
}