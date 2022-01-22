import { SUPPORTED_NETWORKS, VERIFICATION_CONTRACTS } from '../service-constants';
import { ethers, Contract, providers } from 'ethers';
import { ErrorMessageData, Providers, VerifactionType } from '../../interface/web3-data-interface';
import { SigResult } from '../../interface/signature-interface';
import { VerificationService } from '../VerificationService/VerificationService';
import WalletConnectProvider from "@walletconnect/web3-provider";

const metamask = window.ethereum;

export class Web3Service {
    async signAuthMessage(
        connector: string,
        verifactionType: string,
        email: string,
        appName: string,
        actionType: string,
        infuraId: string,
        ) {
        let provider: ethers.providers.Web3Provider;
        let ens: string;
        let chainId: number;
        let verificationContract: ethers.Contract;
        let sigStatus: SigResult;
        let infuraProvider;

        /*
            create provider
        */
        if ((connector === Providers.METAMASK) && (typeof window.ethereum !== 'undefined')) { 
            await metamask.request({
                method: 'eth_requestAccounts',
            });
            provider = new ethers.providers.Web3Provider(metamask);
        } else if((connector === Providers.WALLETCONNECT)) {
            infuraProvider = new WalletConnectProvider({
                infuraId: infuraId,
                qrcodeModalOptions: {
                    mobileLinks: [
                      "rainbow",
                      "metamask",
                      "argent",
                      "trust",
                      "imtoken",
                      "pillar",
                    ],
                },
            });

            // TODO: Remember connected users with walletconnect
            if (infuraProvider.wc.connected) {
                infuraProvider.disconnect();
            }
            await infuraProvider.enable();
            provider = new providers.Web3Provider(infuraProvider);
        } else {
            const error: ErrorMessageData = {
                actionType: actionType,
                verificationType: verifactionType,
                message: 'Error loading web3 provider'
            }
            throw error;
        }

        /**
            Try to resolve address ENS and updates the title accordingly.
        */
        const [address] = await provider.listAccounts();
        if (!address) {
            const error: ErrorMessageData = {
                actionType: actionType,
                verificationType: verifactionType,
                message: 'Address not found'
            }
            throw error;
        }

        try {
            const checkENS = await provider.lookupAddress(address)
            if (checkENS) {
                ens = checkENS;
            } else {
                ens = '';
            }
        } catch (error) {
            ens = '';
        }

        /*
            Get network from provider
        */
        const result = await provider.getNetwork();
        if(!result) {
            const error: ErrorMessageData = {
                actionType: actionType,
                verificationType: verifactionType,
                message: 'ChainId not found'
            }
            throw error;
        }
        chainId = result.chainId;

        /*
            Load verifaction contract for EIP712
        */
       if (verifactionType === VerifactionType.EIP712 ) {
            try {
                if (SUPPORTED_NETWORKS.indexOf(chainId) === -1) {
                    const error: ErrorMessageData = {
                        actionType: actionType,
                        verificationType: verifactionType,
                        message: `Sign in/ Sign up not supported for current network. Try changing networks`
                    }
                    throw error;
                }
                const contracts = VERIFICATION_CONTRACTS.get(chainId);
                if (!contracts) {
                    const error: ErrorMessageData = {
                        actionType: actionType,
                        verificationType: verifactionType,
                        message: `Can not find abi for ${verifactionType} contract.`
                    }
                    throw error;
                };
                const Verification = contracts[verifactionType];
                verificationContract = new Contract(Verification.address, Verification.abi, provider);

                /*
                    verify signature
                */
                const verificationService = new VerificationService();
                switch(verifactionType) {                 
                    case 'EIP712':
                      sigStatus = await verificationService.signTypedDataEthers(
                        chainId,
                        address,
                        ens,
                        email,
                        appName,
                        location.origin,
                        verificationContract,
                        provider,
                      );
                      break;
                    default:
                    sigStatus = await verificationService.signTypedDataEthers(
                        chainId,
                        address,
                        ens,
                        email,
                        appName,
                        location.origin,
                        verificationContract,
                        provider,
                    );
                }
                return sigStatus;
            } catch (error) {
                throw error;
            }    
       }
    }
}