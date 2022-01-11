import React, {useState, FC } from "react"
import { isValidEmail, isEmpty } from '../../utils/web3-utils';
import { ConnectionProps } from "../../model/connection-interface";
import { Web3Service } from "../../services/Web3Service/Web3Service";
import { ActionData, ACTION_TPYE, ErrorMessageData, Providers } from "../../model/web3-data-interface";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles.css';
import { CHAINID_NETWORK_MAP } from "../../services/service-constants";

declare global {
  interface Window {
    ethereum: any
    web3: any;
  }
}

/**
 * Dapp UI Connection component for user interaction with Ethereum wallet
 */
export const Connection:FC<ConnectionProps> = ({
  primary,
  backgroundcolor, 
  size, 
  verifyinglabel,
  passweb3data,
  errorcallback,
  verificationtype,
  dappname,
  logourl,
  dappid,
  ...props
  }) => {

  const buttonStyle = {
    backgroundColor: backgroundcolor,
  };
  const mode: string = primary ? 'web3-cloud-connection-button--primary' : 'web3-cloud-connection-button--secondary';

  const [web3Values, setWeb3values] = useState({
    providerSetOnClient: false,
    validSig: false,
    isVerifying: false,
    providerCount: 0,
    provider: 'metamask',
    email: '',
    firstName: '',
    lastName: '',
    emailInit: true,
    firstNameInit: true,
    lastNameInit: true,
    isRenderSignUp: true,
    isRenderVerifying: false,
    authErrMessage: '',
    web3Service: new Web3Service(),
  });

  const doAuthUser = async (event: React.FormEvent<HTMLFormElement>, actionType: string) => {
    event.preventDefault();

    setWeb3values((web3Values) => ({
      ...web3Values,
      isVerifying: true,
    }));

    try {
      // sign message and verify signature
      const result = await web3Values.web3Service.signAuthMessage(
        web3Values.provider,
        verificationtype,
        web3Values.email,
        dappname,
        actionType
      );

      if (!result) {
        const error: ErrorMessageData = {
          actionType: actionType,
          verificationType: verificationtype,
          message: 'Error could not verify signature'
        }
        errorLogger(error);
        return;
      }

      if(result.isVerified === false) {
        const error: ErrorMessageData = {
          actionType: actionType,
          verificationType: verificationtype,
          message: 'Failed signature verifaction try a different account/and or email address.'
        }
        errorLogger(error);
        return
      }

      setWeb3values((web3Values) => ({
        ...web3Values,
        providerSetOnClient: true,
        validSig: true,
        providerCount: web3Values.providerCount + 1,
        email: '',
        firstName: '',
        lastName: '',
        emailInit: true,
        firstNameInit: true,
        lastNameInit: true,
        authErrMessage: '',
        isRenderVerifying: true,
      }));

      /*
        gather data
      */  
      const networkName = CHAINID_NETWORK_MAP.get(result.chainId)?.name;
      const scannerUrl = CHAINID_NETWORK_MAP.get(result.chainId)?.scannerUrl;
      const finalData: ActionData = {
          actionType: actionType,
          verificationType: verificationtype,
          provider: web3Values.provider,
          networkName: networkName != undefined? networkName : '',
          networkScanner: scannerUrl != undefined? scannerUrl : '',
          email: web3Values.email,
          signature: result,
      };

      switch(actionType) {
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
        errorLogger(err);
        return;
      }
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
      providerCount: 0,
      authErrMessage: error.message
    }));
  }

  const signOut = (actionType: string) => {
    const finalData: ActionData = {
      actionType: actionType,
      verificationType: verificationtype,
      provider: '',
      networkName: '',
      networkScanner: '',
      email: '',
      signature: null,
    };
    passweb3data(finalData);
    setWeb3values((web3Values) => ({
      ...web3Values,
      validSig: false,
      isVerifying: false,
      provider: 'metamask',
      providerCount: web3Values.providerCount + 1,
      isRenderVerifying: false,
      authErrMessage: '',
    }));
  }

  const setWalletChangeEvent = () => {
    if (web3Values.provider === Providers.METAMASK) {
      window.ethereum.on('accountsChanged', async () => {
        signOut(ACTION_TPYE.CHANGE_ACCOUNT);
      });
  
      window.ethereum.on('chainChanged', async () => {
        signOut(ACTION_TPYE.CHANGE_NETWORK);
      });
    }
  }

  const onEmailChanged = (event: { persist: () => void; target: { value: any; }; }) => {
    event.persist();
    setWeb3values((web3Values) => ({
      ...web3Values,
      email: event.target.value,
    }));

    isEmpty(event.target.value) ?
    setWeb3values((web3Values) => ({
      ...web3Values,
      emailInit: true,
    })):
    setWeb3values((web3Values) => ({
      ...web3Values,
      emailInit: false,
    }));
  }

  const onFirstNameChanged = (event: { persist: () => void; target: { value: any; }; }) => {
    event.persist();
    setWeb3values((web3Values) => ({
      ...web3Values,
      firstName: event.target.value,
    }));

    isEmpty(event.target.value) ?
    setWeb3values((web3Values) => ({
      ...web3Values,
      firstNameInit: false,
    })):
    setWeb3values((web3Values) => ({
      ...web3Values,
      firstNameInit: true,
    }));
  }

  const onLastNameChanged = (event: { persist: () => void; target: { value: any; }; }) => {
    event.persist();
    setWeb3values((web3Values) => ({
      ...web3Values,
      lastName: event.target.value,
    }));

    isEmpty(event.target.value) ?
    setWeb3values((web3Values) => ({
      ...web3Values,
      lastNameInit: false,
    })):
    setWeb3values((web3Values) => ({
      ...web3Values,
      lastNameInit: true,
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

  const renderSignUpView = () =>{
    return(
      <form id="" className="web3-cloud-signin-form" onSubmit={(e) => doAuthUser(e,ACTION_TPYE.SIGN_UP)}>
        {/* First Name */}
        <div className="form-group  web3-cloud-email">
          {isEmpty(web3Values.firstName) && !web3Values.firstNameInit &&(
            <p className="form-text text-muted web3-cloud-invalid">Must provide first name</p>
          )}
          <input disabled={web3Values.isVerifying} className='form-control' type="text" placeholder="Enter First Name" value={web3Values.firstName} onChange={onFirstNameChanged}/>
        </div>
        {/* Last Name */}
        <div className="form-group  web3-cloud-email">
          {isEmpty(web3Values.lastName) && !web3Values.lastNameInit &&(
            <p className="form-text text-muted web3-cloud-invalid">Must provide last name</p>
          )}
          <input disabled={web3Values.isVerifying} className='form-control' type="text" placeholder="Enter Last Name" value={web3Values.lastName} onChange={onLastNameChanged}/>
        </div>
        {/* Email */}
        <div className="form-group  web3-cloud-email">
          {!isValidEmail(web3Values.email) && web3Values.emailInit === false &&(
            <p className="form-text text-muted web3-cloud-invalid">Invalid Email</p>
          )}
          <input disabled={web3Values.isVerifying} className='form-control' type="email" placeholder="Enter Email" value={web3Values.email} onChange={onEmailChanged}/>
        </div>
        {/* Submit */}
        <div>
          {!web3Values.validSig &&(
            <p className="form-text text-muted web3-cloud-invalid">{web3Values.authErrMessage}</p>
          )}
          <button
            type="submit"
            className={['web3-cloud-connection-button', `web3-cloud-connection-button--${size}`, mode].join(' ')}
            style={buttonStyle}
            disabled={!isValidEmail(web3Values.email) || isEmpty(web3Values.firstName) || isEmpty(web3Values.lastName) || web3Values.isVerifying}
            {...props}
            >
            Sign up with Metamask
          </button>
          <p className="web3-cloud-signin-toggle" onClick={doToggleViews}>Already a member? Go to sign in</p>
        </div>
      </form>
    );
  }

  const renderSignInView = () => {
    return (
      <form id="" className="web3-cloud-signin-form" onSubmit={(e) => doAuthUser(e,ACTION_TPYE.SIGN_IN)}>
        {/* Email */}
        <div className="form-group  web3-cloud-email">
          {!isValidEmail(web3Values.email) && web3Values.emailInit === false &&(
            <p className="form-text text-muted web3-cloud-invalid">Invalid Email</p>
          )}
          <input disabled={web3Values.isVerifying} className='form-control' type="email" placeholder="Enter Email" value={web3Values.email} onChange={onEmailChanged}/>
        </div>
        {/* Submit */}
        <div>
          {!web3Values.validSig &&(
            <p className="form-text text-muted web3-cloud-invalid">{web3Values.authErrMessage}</p>
          )}
          <button
            type="submit"
            className={['web3-cloud-connection-button', `web3-cloud-connection-button--${size}`, mode].join(' ')}
            style={buttonStyle}
            disabled={!isValidEmail(web3Values.email) || web3Values.isVerifying }
            {...props}
            >
            Login in with Metamask
          </button>
          <p className="web3-cloud-signin-toggle" onClick={doToggleViews}>Not a member? Go to sign up</p>
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
      {web3Values.providerCount === 1 && web3Values.providerSetOnClient && setWalletChangeEvent()}
        <div className="web3-cloud-form-container">
          {web3Values.isRenderVerifying ?
            <div>{renderVerifyingView()}</div>
          :
            <div>
              <header>
                <img src={logourl} alt="profile-img" className="web3-cloud-profile-img-card"/>
                <h1 className="web3-cloud-dapp-name">Welcome to {dappname}</h1>
              </header>
              {web3Values.isRenderSignUp ? 
              <div>{renderSignUpView()}</div>
                :
              <div>{renderSignInView()}</div>
              }
            </div>
          }
        </div>
    </div>
  );
};

Connection.defaultProps = {
  backgroundcolor: '',
  primary: false,
  size: 'medium',
  verificationtype: 'EIP712',
  logourl: 'https://',
};



