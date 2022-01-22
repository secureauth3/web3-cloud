import { ethers } from "ethers";

export interface Contracts {
    EIP712: {
        address: string;
        abi: string[];
    };
}

export interface NetworkInfo {
    name: string;
    scannerUrl: string;
}

export interface SigResult {
    sigType: string;
    isSigned: boolean;
    v: number;
    r: string;
    s: string;
    message: string;
    url: string;
    nonce: string;
    expiration: number;
    isVerified: boolean;
    chainId: number;
    account: string;
    ens: string;
    web3Provider: ethers.providers.Web3Provider | null;
}