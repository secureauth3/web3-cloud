import React, {useState} from "react";
import { ButtonProps } from "../../interface/button-interface";
import { ACTION_TPYE, ButtonSignatureData, ErrorMessageData, Providers, VerifactionType } from "../../interface/web3-data-interface";
import Modal from 'react-modal';

import metamaskLogo from '../../assets/metamask.png';
import walletConnectLogo from '../../assets/walletConnect.png';
import './Button.css';
import '../../styles.css';
import { Web3Service } from "../../services/Web3Service/Web3Service";
import { CHAINID_NETWORK_MAP } from "../../services/service-constants";

export function Button({
    primary,
    backgroundcolor, 
    size, 
    buttonlabel,
    buttonDataCallback,
    buttonErrorCallback,
    dappname,
    infuraId,
    messageToSign,
    backend
    }: ButtonProps) {

    const buttonStyle = {
        backgroundColor: backgroundcolor,
    };
    const mode: string = primary ? 'web3-cloud-connection-button--primary' : 'web3-cloud-connection-button--secondary';
    const [web3Values, setWeb3values] = useState({
        providerSetOnClient: false,
        validSig: false,
        isRequestingSig: false,
        provider: '',
        authErrMessage: '',
        showConnectAccountModal: false,
        showWalletInfo: false,
        actionType: '',
        web3Service: new Web3Service()
    });

    
    const doOpenModal = async (event: any, actionType: ACTION_TPYE) => {
        event.preventDefault();

        const isValidInput = checkInputValues();
        if(!isValidInput.valid) {
            const error: ErrorMessageData = {
            actionType: web3Values.actionType,
            verificationType: VerifactionType.SIWE,
            message: `Invalid ${isValidInput.type} input for Button component`
            }
            errorLogger(error);
            return;
        }

        setWeb3values((web3Values) => ({
        ...web3Values,
        showConnectAccountModal: true,
        actionType: actionType
        }));
    }

    const closeModalRequest = (event: any) => {
        event.preventDefault();

        if (web3Values.isRequestingSig) {
        return;
        }

        setWeb3values((web3Values) => ({
        ...web3Values,
        showConnectAccountModal: !web3Values.showConnectAccountModal,
        isRequestingSig: false,
        }))
    }

    const checkInputValues = () => {
        if (infuraId === '') {
            return {type: 'infuraId' , valid: false};
        } else if (dappname === '') {
            return {type: 'dappname' , valid: false};
        } else {
            return {type: 'valid' , valid: true};
        }
    }

    const doAuthUser = async (event: any, walletProvider: Providers) => {
        event.preventDefault();
        if (web3Values.isRequestingSig) {
            return;
        }

        try {
            setWeb3values((web3Values) => ({
                ...web3Values,
                isRequestingSig: true,
                provider: walletProvider,
              }));
        
              // set provider
              const providerResult = await web3Values.web3Service.setProvider(
                walletProvider,
                VerifactionType.SIWE,
                web3Values.actionType,
                infuraId
              );
        
              if (!providerResult) {
                const error: ErrorMessageData = {
                  actionType: web3Values.actionType,
                  verificationType: VerifactionType.SIWE,
                  message: 'Error creating provider'
                }
                errorLogger(error);
                return;
              }
        
              // sign message with SIWE
              const sigSIWE = await web3Values.web3Service.createSiweMessage(
                providerResult.address,
                messageToSign,
                providerResult.chainId.toString(),
                window.location.origin,
                window.location.host,
                providerResult.provider,
                backend,
              );

            // close modal and update state to provider state
            setWeb3values((web3Values) => ({
                ...web3Values,
                providerSetOnClient: true,
                showConnectAccountModal: false,
                validSig: true,
                authErrMessage: '',
                web3Provider: providerResult.provider
            }));

               /*
                gather and send data
            */  
            const networkName = CHAINID_NETWORK_MAP.get(providerResult.chainId)?.name;
            const scannerUrl = CHAINID_NETWORK_MAP.get(providerResult.chainId)?.scannerUrl;
            const finalData: ButtonSignatureData = {
                actionType: web3Values.actionType,
                verificationType: VerifactionType.SIWE,
                provideType: walletProvider,
                networkName: networkName != undefined? networkName : '',
                networkScanner: scannerUrl != undefined? scannerUrl : '',
                address: providerResult.address,
                ens: providerResult.ens,
                chainId: providerResult.chainId,
                signature: sigSIWE.signature,
                message: sigSIWE.message,
                nonceSetFromBackend: sigSIWE.nonceSetFromBackend,
                web3Provider: providerResult.provider
            };
            buttonDataCallback(finalData);
        } catch (err: any) {
            if('message' in err) {
                if (err.message === 'User closed modal') {
                  return;
                } else if (err.message === 'MetaMask Message Signature: User denied message signature.') {
                  const error: ErrorMessageData = {
                    actionType: web3Values.actionType,
                    verificationType: VerifactionType.SIWE,
                    message: err.message
                  }
                  errorLogger(error);
                }
                else {
                  errorLogger(err);
                  return;
                }
              }
        }
    }

    const errorLogger = (error: ErrorMessageData) => {
        buttonErrorCallback(error);
        // reset state
        setWeb3values((web3Values) => ({
            ...web3Values,
            authErrMessage: error.message,
            providerSetOnClient: false,
            validSig: false,
            isRequestingSig: false,
            provider: '',
            showConnectAccountModal: false,
            showWalletInfo: false,
            actionType: '',
        }));
    }

    return (
        <div>
            <button
                className={['web3-cloud-connection-button', `web3-cloud-connection-button--${size}`, mode].join(' ')}
                style={buttonStyle}
                onClick={(e) => {doOpenModal(e, ACTION_TPYE.BUTTON_SIGN)}}
            >
                {buttonlabel}
            </button>
            <Modal id="modal-connect" 
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                ariaHideApp={false}
                onRequestClose={(e) => {closeModalRequest(e)}}
                isOpen={web3Values.showConnectAccountModal}
                >
                <div className="modal-header">
                    <h5 className="modal-title">Select a Wallet</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={(e) => {closeModalRequest(e)}}>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="web3-cloud-metamask-provider">
                    <button type="button" className="web3-cloud-connection-button-provider" onClick={(e) => doAuthUser(e, Providers.METAMASK)}>
                        <img src={metamaskLogo} className="wallet-icon-metamask" alt="metamask logo"/>  
                        <p className="wallet-text-metamask">Metamask</p>
                    </button>
                    </div>
                    <div>
                    <button type="button" className="web3-cloud-connection-button-provider" onClick={(e) => doAuthUser(e, Providers.WALLETCONNECT)}>
                        <img src={walletConnectLogo} className="wallet-icon-walletconnect" alt="walletConnect logo"/>
                        <p className="wallet-text-walletconnect">WalletConnect</p>
                    </button>
                    </div>
                </div>
                <div className="modal-footer">
                    <h5 id="info-tab" className="modal-title" onClick={(e) => {setWeb3values((web3Values) => ({
                        ...web3Values,
                        showWalletInfo: !web3Values.showWalletInfo
                        }))}}>
                        What is a wallet?
                    </h5>
                    {web3Values.showWalletInfo &&
                        <p>
                        Wallets are used to send, receive, and store digital assets like Ether.
                        Wallets come in many forms. They are either built into your browser, an extension 
                        added to your browser, a piece of hardware plugged into your computer or even an app 
                        on your phone. For more information about wallets, see this 
                        <a
                            href="https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/"
                            target="_blank"
                            rel="noopener noreferrer"> explanation
                        </a>.
                        </p>
                    }
                </div>
            </Modal>
        </div>
    )
};

Button.defaultProps = {
    backgroundcolor: 'blue',
    primary: true,
    size: 'large',
    messageToSign:`Signing this unique message will produce a digital signature that we verify to prove ownership of your wallet. Please be aware that signing will not cost any gas!`,
};