import React, { useState } from "react"
import PropTypes from 'prop-types';
import '../../styles.css';

import Web3Service from '../../service/Web3Service';

/**
 * Dapp UI Connection component for user interaction with Ethereum wallet
 */
export const Connection = ({ 
  primary,
  backgroundColor, 
  size, 
  connectLabel,
  disconnectLabel,
  ...props
  }) => {

  const mode = primary ? 'connection-button--primary' : 'connection-button--secondary';
  const [isConnected, setIsConnect] = useState(false);
  const [connection, setConnection] = useState(null);
  const [account, setAccount] = useState('');
  const [network, setNetwork] = useState('');
  const [networkId, setNetworkId] = useState('');
  const [networkScanner, setNetworkScanner] = useState('');
  const [ethBalance, setEthBalance] = useState('');

  const doConnectWallet  = async (event) => {
    event.preventDefault();

    if( window.ethereum && connection === null ) {

      const web3 = await Web3Service.loadWeb3();

      if(web3) {
        setConnection(web3);

        const account = await Web3Service.loadAccount();
        const networkObj = await Web3Service.loadNetwork(web3);
        const ethBalance = await Web3Service.loadEthBalance(web3,account);
        
        setAccount(account);
        setNetwork(networkObj.network);
        setNetworkId(networkObj.networkId);
        setNetworkScanner(networkObj.scanner);
        setEthBalance(ethBalance);
        setIsConnect(true);

        window.ethereum.on('accountsChanged', async () => { 
          console.log('account changed');
        });
        window.ethereum.on('chainChanged', async () => {
          window.location.reload();
        });
      }
    }
  };

  const doDisConnectWallet = async (event) => {
    event.preventDefault();

    setAccount('');
    setNetwork('');
    setNetworkId('');
    setNetworkScanner('');
    setEthBalance('');
    setIsConnect(false);
    setConnection(null);
    
    console.log('button clicked disconnect from wallet');
  }

  return (
    <div>
      <button
        type="button"
        className={['connection-button', `connection-button--${size}`, mode].join(' ')}
        style={backgroundColor && { backgroundColor }}
        {...props}
        onClick={(e) => isConnected ? doDisConnectWallet(e) : doConnectWallet (e) }
      >
        {isConnected ? disconnectLabel : connectLabel}
      </button>

      {account && 
        <div>
          <a href={`${networkScanner}/${account}`} target="_blank" rel="noopener noreferrer">
            Ethereum Account: {account}
          </a> 
          <p>ETH: {ethBalance}</p>
          <p>Network: {network}</p>
          <p>NetworkID: {networkId}</p>
                 
        </div>
      }
    </div>
  );
};

Connection.propTypes = {
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  connectLabel: PropTypes.string.isRequired,
  disconnectLabel: PropTypes.string.isRequired,
};

Connection.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
};
