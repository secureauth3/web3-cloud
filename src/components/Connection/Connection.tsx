import React, {useState, FC } from "react";
import { ConnectionProps } from "../../interface/connection-interface";
import { Web3Service } from "../../services/Web3Service/Web3Service";
import { ActionData, ACTION_TPYE, ErrorMessageData, Providers, VerifactionType } from "../../interface/web3-data-interface";
import { CHAINID_NETWORK_MAP } from "../../services/service-constants";
import Modal from 'react-modal';
import metamaskLogo from '../../assets/metamask.png';
import walletConnectLogo from '../../assets/walletConnect.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles.css';

declare global {
  interface Window {
    ethereum: any
    web3: any;
  }
}

/**
 * Dapp UI Connection component for user interaction with Ethereum wallet
 */
Modal.setAppElement('#root');
export const Connection:FC<ConnectionProps> = ({
  primary,
  backgroundcolor, 
  size, 
  verifyinglabel,
  passweb3data,
  errorcallback,
  dappname,
  logourl,
  infuraId,
  homePageurl,
  disableErrorDisplay,
  messageToSign,
  ...props
  }) => {

  const buttonStyle = {
    backgroundColor: backgroundcolor,
  };
  const likStlye = {
    color: backgroundcolor
  };
  const mode: string = primary ? 'web3-cloud-connection-button--primary' : 'web3-cloud-connection-button--secondary';

  const [web3Values, setWeb3values] = useState({
    providerSetOnClient: false,
    validSig: false,
    isVerifying: false,
    provider: '',
    email: '',
    firstName: '',
    lastName: '',
    isRenderSignUp: true,
    isRenderVerifying: false,
    authErrMessage: '',
    showConnectAccountModal: false,
    showWalletInfo: false,
    actionType: '',
    web3Service: new Web3Service()
  });

  const doOpenModal = async (event: any, actionType: ACTION_TPYE) => {
    event.preventDefault();

    setWeb3values((web3Values) => ({
      ...web3Values,
      showConnectAccountModal: true,
      actionType: actionType
    }));
  }

  const doAuthUser = async (event: any, walletProvider: Providers) => {
    event.preventDefault();
    const isValidInput = checkInputValues();
    if(!isValidInput.valid) {
      const error: ErrorMessageData = {
        actionType: web3Values.actionType,
        verificationType: VerifactionType.SIWE,
        message: `Invalid ${isValidInput.type} input for Connection component`
      }
      errorLogger(error);
      return;
    }

    try {
      setWeb3values((web3Values) => ({
        ...web3Values,
        isVerifying: true,
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
      );

      // update state to verifying
      setWeb3values((web3Values) => ({
        ...web3Values,
        providerSetOnClient: true,
        showConnectAccountModal: false,
        validSig: true,
        email: '',
        firstName: '',
        lastName: '',
        emailInit: true,
        firstNameInit: true,
        lastNameInit: true,
        authErrMessage: '',
        isRenderVerifying: true,
        web3Provider: providerResult.provider
      }));

      /*
        gather data
      */  
      const networkName = CHAINID_NETWORK_MAP.get(providerResult.chainId)?.name;
      const scannerUrl = CHAINID_NETWORK_MAP.get(providerResult.chainId)?.scannerUrl;
      const finalData: ActionData = {
          actionType: web3Values.actionType,
          verificationType: VerifactionType.SIWE,
          provideType: walletProvider,
          networkName: networkName != undefined? networkName : '',
          networkScanner: scannerUrl != undefined? scannerUrl : '',
          email: web3Values.email,
          address: providerResult.address,
          ens: providerResult.ens,
          chainId: providerResult.chainId,
          signature: sigSIWE,
          web3Provider: providerResult.provider
      };

      switch(web3Values.actionType) {
        case ACTION_TPYE.SIGN_UP:
          passweb3data({
              ...finalData,
              firstName: web3Values.firstName,
              lastName: web3Values.lastName
          });
          break;
        case ACTION_TPYE.SIGN_IN:
          passweb3data(finalData);
          break;
        default:
          break;
      }
    } catch (err: any) {
      if('message' in err) {
        if (err.message === 'User closed modal') {
          return;
        } else {
          errorLogger(err);
          return;
        }
      }
    }
  }

  const checkInputValues = () => {
    if (infuraId === '') {
      return {type: 'infuraId' , valid: false};
    } else if (dappname === '') {
      return {type: 'dappname' , valid: false};
    } else if (verifyinglabel === '') {
      return {type: 'verifyinglabel' , valid: false};
    } else {
      return {type: 'valid' , valid: true};
    }
  }

  const errorLogger = (error: ErrorMessageData) => {
    errorcallback(error);
    setWeb3values((web3Values) => ({
      ...web3Values,
      connected: false,
      isVerifying: false,
      validSig: false,
      providerSetOnClient: false,
      authErrMessage: error.message,
      showConnectAccountModal: false
    }));
  }

  const onEmailChanged = (event: { persist: () => void; target: { value: any; }; }) => {
    event.persist();
    setWeb3values((web3Values) => ({
      ...web3Values,
      email: event.target.value,
    }));
  }

  const onFirstNameChanged = (event: { persist: () => void; target: { value: any; }; }) => {
    event.persist();
    setWeb3values((web3Values) => ({
      ...web3Values,
      firstName: event.target.value,
    }));
  }

  const onLastNameChanged = (event: { persist: () => void; target: { value: any; }; }) => {
    event.persist();
    setWeb3values((web3Values) => ({
      ...web3Values,
      lastName: event.target.value,
    }));
  }

  const doToggleViews = () => {
    setWeb3values((web3Values) => ({
      ...web3Values,
      connected: false,
      isVerifying: false,
      validSig: false,
      email: '',
      firstName: '',
      lastName: '',
      emailInit: true,
      firstNameInit: true,
      lastNameInit: true,
      isRenderSignUp: !web3Values.isRenderSignUp,
      authErrMessage: ''
    }));
  }

  const renderSignUpView = () => {
    return(
      <form className="web3-cloud-signin-form" onSubmit={(e) => doOpenModal(e, ACTION_TPYE.SIGN_UP)}>
        <div className="form-group  web3-cloud-email">
          <input disabled={web3Values.isVerifying} className='form-control' type="text" placeholder="Your first name" value={web3Values.firstName} onChange={onFirstNameChanged} required/>
        </div>
        <div className="form-group  web3-cloud-email">
          <input disabled={web3Values.isVerifying} className='form-control' type="text" placeholder="Your last name" value={web3Values.lastName} onChange={onLastNameChanged} required/>
        </div>
        <div className="form-group  web3-cloud-email">
          <input disabled={web3Values.isVerifying} className='form-control' type="email" placeholder="Email address" value={web3Values.email} onChange={onEmailChanged} required/>
        </div>
        <div>
          {!web3Values.validSig && !disableErrorDisplay &&(
            <p className="form-text text-muted web3-cloud-invalid">{web3Values.authErrMessage}</p>
          )}
          <button
            type="submit"
            className={['web3-cloud-connection-button', `web3-cloud-connection-button--${size}`, mode].join(' ')}
            style={buttonStyle}
            {...props}
            >
            Sign up with a Wallet
          </button>
          <p>Already have an account? <span className="web3-cloud-signin-toggle" onClick={doToggleViews} style={likStlye}>Sign in</span></p>
        </div>
      </form>
    );
  }

  const renderSignInView = () => {
    return (
      <form id="" className="web3-cloud-signin-form" onSubmit={(e) => doOpenModal(e, ACTION_TPYE.SIGN_IN)}>
        <div className="form-group  web3-cloud-email">
          <input disabled={web3Values.isVerifying} className='form-control' type="email" placeholder="Email address" value={web3Values.email} onChange={onEmailChanged} required/>
        </div>
        <div>
          {!web3Values.validSig && !disableErrorDisplay &&(
            <p className="form-text text-muted web3-cloud-invalid">{web3Values.authErrMessage}</p>
          )}
          <button
            type="submit"
            className={['web3-cloud-connection-button', `web3-cloud-connection-button--${size}`, mode].join(' ')}
            style={buttonStyle}
            >
            Sign in with a Wallet
          </button>
          <p>Don't have an account? <span className="web3-cloud-signin-toggle" onClick={doToggleViews} style={likStlye}>Sign up</span></p>
        </div>
      </form>
    );
  }

  const renderVerifyingView = () => {
    return (
      <p className="web3-cloud-verifyinglabel">{verifyinglabel}</p>
    );
  }

  return (
    <div className="card web3-cloud-sign-in-container">
        <div className="web3-cloud-form-container">
          {web3Values.isRenderVerifying ?
            <div>{renderVerifyingView()}</div>
          :
            <div>
              <header>
                <img src={logourl} alt="profile-img" className="web3-cloud-profile-img-card" onClick={
                 (e) => {
                  e.preventDefault();
                  window.open(homePageurl, "_self")
                 }
                }/>
                <h1 className="web3-cloud-dapp-name"
                onClick={
                  (e) => {
                   e.preventDefault();
                   window.open(homePageurl, "_self")
                  }
                 }>{dappname}</h1>
              </header>
              {web3Values.isRenderSignUp ? 
              <div>{renderSignUpView()}</div>
                :
              <div>{renderSignInView()}</div>
              }
            </div>
          }
        </div>
        <Modal id="modal-connect" 
          shouldCloseOnEsc={true}
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
  );
};

Connection.defaultProps = {
  backgroundcolor: 'blue',
  primary: true,
  size: 'large',
  messageToSign:`Signing this unique message will produce a digital signature that we verify to prove ownership of your wallet. Please be aware that signing will not cost any gas!`,
  logourl: 'https://idrisbowman.com/images/idrisBowmanIcon.jpg',
  homePageurl: 'https://idrisbowman.com/'
};



