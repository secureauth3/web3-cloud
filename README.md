# Web3 Cloud

Web3 Cloud is web3 Ethereum-compatible authenticator

This is Web3 Cloud an Web3 React library for user wallet authentication. It acts as bridge between web2 and web3, which allows developers to combine the security of blockchain technology with scalable cloud technology.  The API is simple: just provide an Ethereum public address, encrpted data (signed with Ethereum signature), cloud storge type, and Web3 Verify will store your encrypted data in the cloud.

---

## Ethereum network support
- Kovan(coming soon)

## Cloud storage support
- AWS DynamoDB(coming soon)
---
## Install

```
$ npm install web3-verify
```

## Usage 
### Connection(component)
- Dapp UI Connection component for user interaction with Ethereum wallet

1. Add import
 ```
 import { Connection } from "web3-cloud";
```
2. Add commponent
```
// Connection property types (use as a reference)
  Connection.propTypes = {
    primary: PropTypes.bool,
    backgroundColor: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    connectLabel: PropTypes.string.isRequired,
    disconnectLabel: PropTypes.string.isRequired,
  };
```

```
// Example implementation React
  <Connection
        backgroundColor="blue"
        size="medium"
        connectLabel="Connect wallet"
        disconnectLabel="Disconnect wallet"
        primary={true}
  />
```
