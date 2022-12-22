<h2 align="center">(Simple Web3 onboarding with Ethereum wallets.) 🔐</h2>

<br>

<div align="center">

[![web3-cloud](https://snyk.io/advisor/npm-package/web3-cloud/badge.svg)](https://snyk.io/advisor/npm-package/web3-cloud)
![npm type definitions](https://img.shields.io/npm/types/web3-cloud)
![GitHub last commit](https://img.shields.io/github/last-commit/V00D00-child/web3-cloud)


</div>

# `web3-cloud`
Web3-cloud serves as a React wrapper around Sign-In with Ethereum and Secure Auth3, to easily integrate Web3 sign-in/sign-up onboarding, and manage personal data. [Learn more](https://www.secureauth3.com/) about the all the functionalities that Secure Auth3 offers.

---

## Quick start
- Use this sample application to quickly start working with web3cloud:
- repo: https://github.com/V00D00-child/web3-cloud-quick-start
- view live: https://www.findmynft.org/
---


## Requirements
- 4.14.0 of MetaMask
- Infura Project Id (https://infura.io/)
- @walletconnect/web3-provider - 1.7.1 (https://www.npmjs.com/package/@walletconnect/web3-provider)
- react - 17.0.2 (https://www.npmjs.com/package/react)
- react-dom - 17.0.2 (https://www.npmjs.com/package/react-dom)

## Device support
(Desktop, tablet, Mobile)

## Webpack v5 support
There are a lot of breaking changes in Webpack v5. We highly recommend you to use the stable ```npm i react-scripts@4.0.3``` version of react-scripts.

---

## Install

```
$ npm install web3-cloud
```

## API Key
If you would like to use our Web3 Authentication provider feature an API key is required.
Please register your app with Secure Auth3 to obtain a API key. 
- [Get an API key](https://www.secureauth3.com/)


# 🗺️ Table of contents 
- [`web3-cloud`](#web3-cloud)
  - [Quick start](#quick-start)
  - [Requirements](#requirements)
  - [Device support](#device-support)
  - [Webpack v5 support](#webpack-v5-support)
  - [Install](#install)
  - [API Key](#api-key)
- [🗺️ Table of contents](#️-table-of-contents)
  - [Web3 Authentication provider](#web3-authentication-provider)
  - [Hooks](#hooks)
    - [useChainInfo](#usechaininfo)
    - [useAuth3Token](#useauth3token)
  - [Form component](#form-component)
    - [Usage (Form component)](#usage-form-component)
  - [Button component](#button-component)
    - [Usage (Button component)](#usage-button-component)
  - [How to Contributors](#how-to-contributors)
    - [Local dev](#local-dev)
    - [Local testing](#local-testing)
  - [Contributors](#contributors)

---

## Web3 Authentication provider
- Wrap your app in a ```<SecureAuth3Provider>```, and provide your apiKey:

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { SecureAuth3Provider } from 'web3-cloud';

ReactDOM.render(
  <SecureAuth3Provider apiKey="xxxxxxxxxxx">
    <App />
  </SecureAuth3Provider>
  document.getElementById('root')
);
```

- call the useAuth hooks inside your apps for web3 sign in/signup:
```tsx
import React {useEffect} from "react";
import { ErrorMessageData, Form, FormSignatureData, NewAuth3User, useAuth, useAuth3Token } from "web3-cloud";

export default function AuthPage() {
  const auth = useAuth();
  const { setAuth3Token, setWalletStatus } = useAuth3Token(); 

  useEffect(() => {
    /* Secure Auth3 - Single Sign On for persistence logins
      hint(You can define useEffect with an empty dependency which will 
      ensure that the functions only run once)
    */
    const doSingleSignin = async () => {
      const auth3Token = getAccessToken('<your-auth3-token-secret>');
      const ssoResult = await auth.auth3SSO(auth3Token.refreshToken, auth3Token.accessToken);
      if (ssoResult.isAuthenticated) {
        // Save authenicated user JWT
        setAuth3Token(ssoResult.accessToken, ssoResult.refreshToken, AUTH3_REFRESH_TOKEN_SECRET);
      }
      return;
    }

    doSingleSignin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authCallbackData = useCallback(async (web3Values: FormSignatureData) => {
    try {
      switch(web3Values.actionType) {
        case 'SIGN_UP':
          // Secure Auth3 - Sign up user
          const signUpResults = await auth.auth3Signup(
              {
              account: web3Values.address,
              email: web3Values.email,
              firstName: web3Values.firstName? web3Values.firstName : 'First',
              lastName: web3Values.lastName? web3Values.lastName : 'Last',
              ens: web3Values.ens,
              chainId: web3Values.chainId,
              permissionFlag: 3,
            } as NewAuth3User
          );
       
          // Secure Auth3 - Sign in user after account creation sucessful
          const signInResults = await auth.auth3Signin({
            address: web3Values.address,
            email: web3Values.email,
            signature: web3Values.signature,
            message: web3Values.message
          });
          setWalletStatus('true', web3Values.provideType);
          setAuth3Token(signInResults.accessToken, signInResults.refreshToken, '<your-auth3-token-secret>');

          break;
        case 'SIGN_IN':
          // Secure Auth3 - Sign in user
          const signInResults2 = await auth.auth3Signin({
            address: web3Values.address,
            email: web3Values.email,
            signature: web3Values.signature,
            message: web3Values.message
          });
          setWalletStatus('true', web3Values.provideType);
          setAuth3Token(signInResults2.accessToken, signInResults2.refreshToken, '<your-auth3-token-secret>');

          break;
        default:
          break;
      }
    } catch(err) {
        console.log(err);
    }  
  }, [auth]);
  
  const authCallbackError = useCallback((error: ErrorMessageData) => {
    console.log(error.message);
  }, []);

  return (
    <div>
      <Form
        primary={true}
        backgroundcolor='#6555DF'
        size='large'
        dappname=''
        disableErrorDisplay={false}
        messageToSign=''
        infuraId=''
        homePageurl=''
        formDataCallback={authCallbackData}
        formErrorCallback={authCallbackError}   
      />
    </div>
  );
}
```

---


## Hooks
- useChainInfo
- useAuth3Token
- useAuth

### useChainInfo
- Use this hook to get information about a chainId

```jsx

import React from "react";
import { useChainInfo } from "web3-cloud";

export default function AuthPage() {
  const { getChainInfo } = useChainInfo();
  return (
    <div>
      {getChainInfo(1)}
    </div>
  )
}

```

---

### useAuth3Token
- Use this hook to store encrypted JWT and connected wallet status in local storage

```jsx

import React from "react";
import { useAuth3Token } from "web3-cloud";

export default function AuthPage() {
  const { setAuth3Token, setWalletStatus } = useAuth3Token(); 

  return (
    <div>
      {setAuth3Token('jwt-access-token', 'jwt-refresh-token', '<your-auth3-token-secret>')}
      {setWalletStatus('true', 'metamask')}
    </div>
  )
}

```

---

## Form component 
- Description: Dapp UI Form component for Ethereum wallet sign in/sign up
- Features:
  1. Sign in/Sign up: Responsive Form with validation (email, first name, last name)
  2. ENS Resolution
  3. (EIP-1271 signatures) Sign-In with Ethereum - https://github.com/spruceid/siwe
  4. Sign message with nonces
  5. Signature expiration time: 10 mins

```typescript
// Form component prop types 
interface FormProps {
  primary: boolean;
  backgroundcolor: string; 
  size: string; 
  formDataCallback: (web3Data: FormSignatureData) => void;
  formErrorCallback: (errorData: ErrorMessageData) => void;
  dappname: string;
  logourl: string;
  infuraId: string;
  homePageurl: string;
  disableErrorDisplay: boolean;
  messageToSign: string;
  legalPolicy?: LegalPolicy[]
}

interface LegalPolicy {
  name: string;
  url: string;
}

// Form component signature callback data types 
interface FormSignatureData {
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
  nonceSetFromBackend: boolean;
  web3Provider: ethers.providers.Web3Provider;
  token: string;
}

// Form component error callback data types
interface ErrorMessageData {
  actionType: string;
  verificationType: string;
  message: string;
}
```

Form component of callback data (FormSignatureData)
| Data | Data Type | Description
| --- | --- | --- |
| email | string | Account email address
| address | string | Ethereum account
| ens | string | Register ENS for Ethereum account
| firstName | string | Account first name
| lastName | string | Account last name
| actionType | string | Type of authentication (SIGN_UP, SIGN_IN, BUTTON_SIGN) 
| networkName | string | Name of connected network
| networkScanner | string | Block scanner URL for connected network
| signature | string | String that contains signature data
| message | string | String that contains message that account signed
| provideType | string | name of Wallet provider (metamask, wallet-connect)
| web3Provider | ethers.providers.Web3Provider | Web3 Provider
| token | string | Unique session identifier

Form component error callback data (ErrorMessageData)
| Data | Data Type | Description
| --- | --- | --- |
| actionType | string | Type of authentication (SIGN_UP, SIGN_IN, BUTTON_SIGN) 
| verificationType | string | Signature type (EIP712)
| message | string | Error message


### Usage (Form component)
- (Example implementation using React)
```tsx
import { Form } from "web3-cloud";
import { useCallback } from "react";

export default function AuthPage() {

  // Define ReactHooks callbacks
  const web3DataCallback = useCallback((web3Values) => {
    try {
      switch(web3Values.actionType) {
        case 'SIGN_UP':
          // create user in database
          // pass web3 Data to your applications Redux store
          break;
        case 'SIGN_IN':
          // fetch user data from database
          break;
      }
    } catch(err) {
      // handle errors
    }
  }, []);

  const web3formErrorcallback = useCallback((error) => {
    // handle errors based on error types
    try {
      switch(web3Values.actionType) {
        case 'SIGN_UP':
          break;
        case 'SIGN_IN':
          break;
      }
    } catch(err) {
    }
  }, []);

return (
  <div>
    <Form
      primary={true}
      backgroundcolor='green'
      size='large'
      dappname='Web3 Cloud'
      infuraId='<your infura id>'
      logourl='<your dapp logo image url>'
      homePageurl='<your dapp home page url>'
      disableErrorDisplay={false}
      messageToSign={'Your message that users will sign'}
      formDataCallback={web3DataCallback}
      formErrorCallback={web3formErrorcallback}
    />
    </div>
  );
}
```

---

## Button component 
- Description: Dapp UI Form component for Ethereum wallet signature capture
- Features:
  1. ENS Resolution
  2. (EIP-1271 signatures) Sign-In with Ethereum - https://github.com/spruceid/siwe
  3. Sign message with nonces
  4. Signature expiration time: 10 mins

```typescript
// Button component prop types 
interface ButtonProps {
  primary: boolean;
  backgroundcolor: string; 
  size: string;
  buttonDataCallback: (web3Data: ButtonSignatureData) => void;
  buttonErrorCallback: (errorData: ErrorMessageData) => void;
  dappname: string;
  infuraId: string;
  messageToSign: string;
}

// Button component signature callback data types 
interface ButtonSignatureData {
  actionType: string;
  verificationType: string;
  networkName: string;
  provideType: string;
  networkScanner: string;
  signature: string;
  chainId: number;
  address: string;
  ens: string;
  message: string;
  nonceSetFromBackend: boolean;
  web3Provider: ethers.providers.Web3Provider;
  token: string;
}

// Button component error callback data types
interface ErrorMessageData {
  actionType: string;
  verificationType: string;
  message: string;
}
```

Button component of callback data (ButtonSignatureData)
| Data | Data Type | Description
| --- | --- | --- |
| address | string | Ethereum account
| ens | string | Register ENS for Ethereum account
| actionType | string | Type of authentication (SIGN_UP, SIGN_IN, BUTTON_SIGN) 
| networkName | string | Name of connected network
| networkScanner | string | Block scanner URL for connected network
| signature | string | String that contains signature data
| message | string | String that contains message that account signed
| provideType | string | name of Wallet provider (metamask, wallet-connect)
| web3Provider | ethers.providers.Web3Provider | Web3 Provider
| token | string | Unique session identifier

Button component error callback data (ErrorMessageData)
| Data | Data Type | Description
| --- | --- | --- |
| actionType | string | Type of authentication (SIGN_UP, SIGN_IN, BUTTON_SIGN) 
| verificationType | string | Signature type (EIP712)
| message | string | Error message


### Usage (Button component)
- (Example implementation using React)
```tsx
import { Button } from "web3-cloud";
import { useCallback } from "react";

export default function AuthPageWithButton() {

  // Define ReactHooks callbacks
  const web3DataCallback = useCallback((web3Values) => {
    try {
      switch(web3Values.actionType) {
        case 'SIGN_UP':
          // create user in database
          // pass web3 Data to your applications Redux store
          break;
        case 'SIGN_IN':
          // fetch user data from database
          break;
      }
    } catch(err) {
      // handle errors
    }
  }, []);

  const web3buttonErrorcallback = useCallback((error) => {
    // handle errors based on error types
    try {
      switch(web3Values.actionType) {
        case 'SIGN_UP':
          break;
        case 'SIGN_IN':
          break;
      }
    } catch(err) {
    }
  }, []);

return (
  <div>
    <Button
      primary={true}
      backgroundcolor='green'
      size='large'
      buttonlabel='Sign in with wallet'
      dappname='Your Brand Here'
      infuraId='<your infura id>'
      messageToSign={'Your message that users will sign'}
      buttonDataCallback={web3DataCallback}
      buttonErrorCallback={web3formErrorcallback}
    />
    </div>
  );
}
```

---

## How to Contributors
Please take a look at our the [Contributing.md](https://github.com/V00D00-child/web3-cloud/blob/main/CONTRIBUTING.md).

### Local dev
1. Install Dependencies
```
$ npm install
```

2. Run Storybook
```
$ npm run storybook
```

### Local testing
1. Run Unit test with coverage
```
$ npm run test:coverage
```

2. Run Unit test without coverage
```
$ npm run test:coverage
```

3. Clear jest
```
$ npm run clear:jest
```

---

## Contributors
*  [Idris Bowman](https://www.linkedin.com/in/idris-bowman)
