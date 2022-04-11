import React, {useState, FC } from "react";
import { ButtonProps } from "../../interface/button-interface";
import { ACTION_TPYE, ErrorMessageData, Providers, VerifactionType } from "../../interface/web3-data-interface";
import Modal from 'react-modal';

import metamaskLogo from '../../assets/metamask.png';
import walletConnectLogo from '../../assets/walletConnect.png';
import './Button.css';
import '../../styles.css';

export const Button:FC<ButtonProps> = ({
    primary,
    backgroundcolor, 
    size, 
    buttonlabel,
    verifyinglabel,
    passSignedCallback,
    errorcallback,
    dappname,
    infuraId,
    messageToSign,
    backend
    }) => {

        const buttonStyle = {
            backgroundColor: backgroundcolor,
        };
        const mode: string = primary ? 'web3-cloud-connection-button--primary' : 'web3-cloud-connection-button--secondary';
        const [web3Values, setWeb3values] = useState({
            providerSetOnClient: false,
            validSig: false,
            isVerifying: false,
            provider: '',
            authErrMessage: '',
            showConnectAccountModal: false,
            showWalletInfo: false,
            actionType: '',
        });

        const doOpenModal = async (event: any, actionType: ACTION_TPYE) => {
            event.preventDefault();
        
            setWeb3values((web3Values) => ({
              ...web3Values,
              showConnectAccountModal: true,
              actionType: actionType
            }));
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
        }

        const errorLogger = (error: ErrorMessageData) => {
            errorcallback(error);
            // reset state
            setWeb3values((web3Values) => ({
              ...web3Values,
                providerSetOnClient: false,
                validSig: false,
                isVerifying: false,
                provider: '',
                authErrMessage: error.message,
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
                    ariaHideApp={false}
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={(e) => { setWeb3values((web3Values) => ({
                        ...web3Values,
                        showConnectAccountModal: !web3Values.showConnectAccountModal
                    }))}}
                    isOpen={web3Values.showConnectAccountModal}
                    >
                    <div className="modal-header">
                        <h5 className="modal-title">Select a Wallet</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={(e) => {setWeb3values((web3Values) => ({
                        ...web3Values,
                        showConnectAccountModal: !web3Values.showConnectAccountModal,
                        isVerifying: false
                        }))}}>
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