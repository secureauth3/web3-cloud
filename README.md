# Web3 Cloud

Simple Sign-up, Sign In Ethereum account authenticator. Power by Sign-In with Ethereum.

Web3-Cloud is a React compoent library designed to create simple secure User Sign-up, Sign In. Letting a user’s Ethereum wallet become an extension of their digital identity without the need for legacy password ownership models. 
---

## Device support
(Desktop, tablet, Mobile)

## Requirements
- 4.14.0 of MetaMask
- Infura Project Id (https://infura.io/)
- @walletconnect/web3-provider - 1.7.1 (https://www.npmjs.com/package/@walletconnect/web3-provider)
- react - 17.0.2 (https://www.npmjs.com/package/react)
- react-dom - 17.0.2 (https://www.npmjs.com/package/react-dom)
---

## Ethereum account authenticator
- Sign-In with Ethereum - https://github.com/spruceid/siwe

---

## Feautes
- Sign in 
- Sign up
- ENS Resolution

---

## Install

```
$ npm install web3-cloud
```

## Usage 
List of components:
1. Connection - Dapp UI Connection component for user interaction with Ethereum wallet
```
// Connection property types (use as a reference)
  Connection.propTypes = {
    primary: PropTypes.bool,
    backgroundcolor: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    verifyinglabel: PropTypes.string.isRequired,
    infuraId: PropTypes.string.isRequired,
    dappname: PropTypes.string.isRequired,
    disableErrorDisplay: PropTypes.bool
    messageToSign: PropTypes.string,
    logourl: PropTypes.string,
    homePageurl: PropTypes.string
    passweb3data: PropTypes.func.isRequired,
    errorcallback: PropTypes.func.isRequired,
  };
```
Structure of data returned from Connection component (passweb3data callback)
| Data | Data Type | Description
| --- | --- | --- |
| email | string | Account email address
| address | string | Ethereum account
| ens | string | Register ENS for Ethereum account
| firstName | string | Account first name
| lastName | string | Account last name
| actionType | string | Type of authentication (SIGN_UP, SIGN_IN) 
| networkName | string | Name of connected network
| networkScanner | string | Block scanner URL for connected network
| signature | object | Object that contains signature data
| provideType | string | name of Wallet provider (metamask, wallet-connect)
| web3Provider | ethers.providers.Web3Provider | Web3 Provider
```
// example web3 data
{
  actionType: "SIGN_IN"
  address: "0x6C18230EF8Bf455adDA98F5E3ABfe710bD8489C2"
  chainId: 1
  email: "test_email@gmail.com"
  ens: ""
  networkName: "Mainnet Ethereum"
  networkScanner: "https://etherscan.io/address"
  provider: "metamask"
  verificationType: "SIWE"
  signature: "fjsjbj2j2bj33333ff33ffdff43"
  web3Provider: {connection: {url: 'metamask'}...}
}
```

Structure of data returned from Connection component (errorcallback callback)
| Data | Data Type | Description
| --- | --- | --- |
| actionType | string | Type of authentication (SIGN_UP, SIGN_IN) 
| verificationType | string | Signature type (EIP712)
| message | string | Error message
```
// example error data
{
  actionType: "SIGN_UP"
  message: "Sign in/ Sign up not supported for current network. Try changing networks"
  verificationType: "EIP712"
}
```

### Connection Component (EIP712 Verifcation Type)
1. Add imports for web3-cloud and useCallback (react hooks)
 ```
 import { Connection } from "web3-cloud";
 import { useCallback } from "react";
```

2. Add component(Example implementation using React)
```
// Define ReactHooks Callbacks
    const web3DataCallback = useCallback((web3Values) => {
    // pass web3 Data to your applications Redux store
     try {
        switch(web3Values.actionType) {
          case 'SIGN_UP':
            // create user in database
            break;
          case 'SIGN_IN':
            // fetch user data from database
            break;
        }
      } catch(err) {
        // handle errors
      }
  }, []);

  const web3ErrorCallback = useCallback((error) => {
    // handle errors based on error types
    try {
      switch(web3Values.actionType) {
        case 'SIGN_UP':
          // create user in database
          break;
        case 'SIGN_IN':
          // fetch user data from database
          break;
      }
      } catch(err) {
        // handle errors
      }
  }, []);

  <Connection
    primary={true}
    backgroundcolor='green'
    size='large'
    verifyinglabel='Verifiying Signature...'
    dappname='Web3 Cloud'
    infuraId='<your infura id>'
    logourl='<your dapp logo image url>'
    homePageurl='<your dapp home page url>'
    disableErrorDisplay={false}
    messageToSign={'Your message that users will sign'}
    passweb3data={web3DataCallback}
    errorcallback={web3ErrorCallback}
  />
```

<img src="readme-images/web3-cloud-connection-component-sign-up.jpg" width="100%" margin-bottom="5%" align="left" >
---
<img src="readme-images/web3-cloud-connection-component-sign-in.jpg" width="100%" margin-bottom="5%" align="left" >
---
<img src="readme-images/web3-cloud-connection-component-sign-providers.jpg" width="100%" margin-bottom="5%" align="left" >
---
<img src="readme-images/web3-cloud-connection-component-sig.jpg" width="100%" margin-bottom="5%" align="left" >
---
<img src="readme-images/web3-cloud-connection-component-sig-verifying.jpg" width="100%" margin-bottom="5%" align="left" >
---

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
