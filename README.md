# Web3 Cloud

Simple Sign-up, Sign In Ethereum account authenticator. Power by Sign-In with Ethereum.

Web3-Cloud is a React component library designed to create simple secure User Sign-up, Sign In. Generate [EIP-1271 signatures](https://eips.ethereum.org/EIPS/eip-1271)

## Coming soon(Join waiting list)
[Secure Auth3](https://www.secureauth3.com/)
The perfect solution for Developers who want integrate Web3 sign-in/sign-up into their applications. Auth3 API was built to provide a new web3 authentication model that give users more control over their digital identity without the need for legacy password ownership models.

---

## Quick start application
- repo: https://github.com/V00D00-child/web3-cloud-quick-start
- view live: https://www.findmynft.org/

## Device support
(Desktop, tablet, Mobile)

## Requirements
- 4.14.0 of MetaMask
- Infura Project Id (https://infura.io/)
- @walletconnect/web3-provider - 1.7.1 (https://www.npmjs.com/package/@walletconnect/web3-provider)
- react - 17.0.2 (https://www.npmjs.com/package/react)
- react-dom - 17.0.2 (https://www.npmjs.com/package/react-dom)
---

## Webpack v5 support
There are a lot of breaking changes in Webpack v5. Set up your project to work with web3-cloud library:

#### configuring Webpack v5
We highly recommend you to use the stable 4.0.3 version of Webpack. If you want to use web3-cloud on your project with Webpack v5 you need to add the fallback to your ```webpack.config.js``` file:

```javascript
module.exports = {
    resolve: {
        fallback: {
            assert: require.resolve('assert'),
            crypto: require.resolve('crypto-browserify'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            stream: require.resolve('stream-browserify'),
        },
    },
};
```

## Install

```
$ npm install web3-cloud
```

## List of components  
- Form component
- Single Sign on button component
- Web3 Authentication provider component (coming soon)
### Form component 
- Description: Dapp UI Form component for Ethereum wallet sign in/sign up
- Features:
  1. Sign in/Sign up: Responsive Form with validation (email, first name, last name)
  2. ENS Resolution
  3. (Optional)Fetch nonce from backend server(Sign-In with Ethereum)
      - Follow recommended documention for fetching nonce from a backend server (https://docs.login.xyz/sign-in-with-ethereum/quickstart-guide/implement-the-backend)
  4. (EIP-1271 signatures) Sign-In with Ethereum - https://github.com/spruceid/siwe
  5. Sign message with nonces
  6. Signature expiration time: 10 mins

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


Form component error callback data (ErrorMessageData)
| Data | Data Type | Description
| --- | --- | --- |
| actionType | string | Type of authentication (SIGN_UP, SIGN_IN, BUTTON_SIGN) 
| verificationType | string | Signature type (EIP712)
| message | string | Error message


### Usage (React component)
- (Example implementation using React)
```jsx
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

<img src="readme-images/web3-cloud-connection-component-sign-up.jpg" width="100%" margin-bottom="5%" align="left" >

---
<img src="readme-images/web3-cloud-connection-component-sign-in.jpg" width="100%" margin-bottom="5%" align="left" >

---
<img src="readme-images/web3-cloud-connection-component-sign-providers.jpg" width="100%" margin-bottom="5%" align="left" >

---
<img src="readme-images/web3-cloud-connection-component-sig-verifying.jpg" width="100%" margin-bottom="5%" align="left" >

---


### Button component 
- Description: Dapp UI Form component for Ethereum wallet signature capture
- Features:
  1. ENS Resolution
  2. (Optional)Fetch nonce from backend server(Sign-In with Ethereum)
      - Follow recommended documention for fetching nonce from a backend server (https://docs.login.xyz/sign-in-with-ethereum/quickstart-guide/implement-the-backend)
  3. (EIP-1271 signatures) Sign-In with Ethereum - https://github.com/spruceid/siwe
  4. Sign message with nonces
  5. Signature expiration time: 10 mins

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


Button component error callback data (ErrorMessageData)
| Data | Data Type | Description
| --- | --- | --- |
| actionType | string | Type of authentication (SIGN_UP, SIGN_IN, BUTTON_SIGN) 
| verificationType | string | Signature type (EIP712)
| message | string | Error message


### Usage (React component)
- (Example implementation using React)
```jsx
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

## Local dev
1. Install Dependencies
```
$ npm install
```

2. Run Storybook
```
$ npm run storybook
```

## Local testing
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

## Authors
*  [Idris Bowman](https://www.linkedin.com/in/idris-bowman)
