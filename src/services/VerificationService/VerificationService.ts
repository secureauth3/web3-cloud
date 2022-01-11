import { generateNonce } from '../../utils/web3-utils';
import { ethers } from 'ethers';
import { SigResult } from '../../model/signature-interface';

/**
    * 
    * EIP712 
    * The users signature will be diffent for each login in, and different 
    * accoss networks. All sign in/ sign up signatures will be valid for 2 mins
    * 
    *   - name: the dApp or protocol name, e.g. “CryptoKitties”
        - version: The current version of what the standard calls a “signing domain”. This can be the version number of your dApp or platform. It prevents signatures from one dApp version from working with those of others. 
        - chainId: The EIP-155 chain id. Prevents a signature meant for one network, such as a testnet, from working on another, such as the mainnet.   
        - verifyingContract: The Ethereum address of the contract that will verify the resulting signature. The thiskeyword in Solidity returns the contract’s own address, which it can use when verifying the signature.
        - salt: A unique 32-byte value hardcoded into both the contract and the dApp meant as a last-resort means to distinguish the dApp from others.
*/
export class VerificationService {
   
    async signTypedDataWeb3(networkId: number, account: string, email:string, appName: string, appUrl: string, verificationContract: any) {   
        const actionMessage = `${appName} wants to use you digital signature to sign into our dApp.Signing this unique message will produce a digital signature that we verify to prove ownership of your wallet.This signature will ONLY be used to sign you in and is set to expire in 5 mintues.Please be aware that signing will not cost any gas!`;
        const nonce = await generateNonce();
        let r = '';
        let s = '';
        let v = 0;
        const secondsSinceEpoch = Math.round(Date.now() / 1000) + 150;

        try {
            const msgParams = JSON.stringify({
                domain: {
                    name: 'Web3 Cloud',
                    version: '1',
                    chainId: networkId,
                    verifyingContract: verificationContract.options.address,
                },
                message: {
                    action: actionMessage,
                    signer: account,
                    email: email,
                    url: appUrl,
                    nonce: nonce,
                    expiration: secondsSinceEpoch
                },
                primaryType: 'Identity',
                types: {
                    EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' },
                    ],
                    Identity: [
                        { name: "action", type: "string" },
                        { name: "signer", type: "address" },
                        { name: "email", type: "string" },
                        { name: "url", type: "string" },
                        { name: "nonce", type: "uint256" },
                        { name: "expiration", type: "uint256" },
                    ],
                },
            });

            const result = await window.ethereum.request({ 
                method: "eth_signTypedData_v4",
                params: [account, msgParams],
                from: account 
                }
            );
    
            const signature = result.substring(2);
            r = "0x" + signature.substring(0, 64);
            s = "0x" + signature.substring(64, 128);
            v = parseInt(signature.substring(128, 130), 16);
            const verifiedSigAddressOnChain = await verificationContract.methods.verify(
                v,
                r,
                s,
                actionMessage,
                account,
                email,
                appUrl,
                nonce,
                secondsSinceEpoch
            ).call();

            if (!verifiedSigAddressOnChain) return null;
            return {
                v,
                r,
                s,
                action: actionMessage,
                url: appUrl,
                nonce,
                expiration: secondsSinceEpoch
            };
        } catch (error) {
            return null;
        }
    }

    async signTypedDataEthers(
        chainId: number,
        account: string,
        ens: string,
        email: string,
        appName: string,
        appUrl: string,
        verificationContract: ethers.Contract,
        provider: ethers.providers.Web3Provider,
        ) {   
        let sigResult: SigResult;
        const actionMessage = `${appName} wants to use your digital signature to sign into our dApp. Signing this unique message will produce a digital signature that we verify to prove ownership of your wallet. This signature will ONLY be used to sign you in and is set to expire in 2 minutes. Please be aware that signing will not cost any gas!`;
        const nonce = await generateNonce();
        let r = '';
        let s = '';
        let v = 0;
        const secondsSinceEpoch = Math.round(Date.now() / 1000) + 150;

        try {

            const domain = {
                name: 'Web3 Cloud',
                version: '1',
                chainId: chainId,
                verifyingContract: verificationContract.address,
            };

            const types = {
                Identity: [
                    { name: "action", type: "string" },
                    { name: "signer", type: "address" },
                    { name: "email", type: "string" },
                    { name: "url", type: "string" },
                    { name: "nonce", type: "string" },
                    { name: "expiration", type: "uint256" },
                ],
            };

            const message = {
                action: actionMessage,
                signer: account,
                email: email,
                url: appUrl,
                nonce: nonce,
                expiration: secondsSinceEpoch
            };

            const signResult = await provider.getSigner()._signTypedData(domain, types, message);
            const signature = signResult.substring(2);
            r = "0x" + signature.substring(0, 64);
            s = "0x" + signature.substring(64, 128);
            v = parseInt(signature.substring(128, 130), 16);

            const verifiedSigAddressOnChain = await verificationContract.verify(
                v,
                r,
                s,
                actionMessage,
                account,
                email,
                appUrl,
                nonce,
                secondsSinceEpoch
            );
            
            sigResult = {
                sigType: 'EIP712',
                isSigned: true,
                v,
                r,
                s,
                message: actionMessage,
                url: appUrl,
                nonce,
                expiration: secondsSinceEpoch,
                isVerified: verifiedSigAddressOnChain,
                chainId: chainId,
                account: account,
                ens: ens
            }
            return sigResult
        } catch (error) {
            sigResult = {
                sigType: 'EIP712',
                isSigned: false,
                v: 0,
                r: '',
                s: '',
                message: '',
                url: '',
                nonce: '',
                expiration: 0,
                isVerified: false,
                chainId: chainId,
                account: '',
                ens: ''
            }
            return sigResult;
        }  
    }
}
