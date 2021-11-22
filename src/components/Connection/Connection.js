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
  parentWeb3Callback,
  ...props
  }) => {

  const mode = primary ? 'connection-button--primary' : 'connection-button--secondary';
  const [web3Values, setWeb3values] = useState({
    isConnected: false,
    connection: null,
  });

  const doConnectWallet  = async (event) => {
    event.preventDefault();

    if( window.ethereum && web3Values.connection === null ) {

      const web3 = await Web3Service.loadWeb3();

      if(web3) {
        const account = await Web3Service.loadAccount();
        const networkObj = await Web3Service.loadNetwork(web3);
        const ethBalance = await Web3Service.loadEthBalance(web3,account);

        setWeb3values((web3Values) => ({
          ...web3Values,
          isConnected: true,
          connection: web3,
        }));

        // pass to parent
        parentWeb3Callback({
          isConnected: true,
          connection: web3,
          account: account,
          network: networkObj.network,
          networkId: networkObj.networkId,
          networkScanner: networkObj.scanner,
          ethBalance: ethBalance
        });

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

    setWeb3values((web3Values) => ({
      ...web3Values,
      isConnected: false,
      connection: null,
    }));

    // pass to parent
    parentWeb3Callback({
      isConnected: false,
      connection: null,
      account: '',
      network: '',
      networkId: '',
      networkScanner: '',
      ethBalance: ''
    });
  }

  return (
    <div>
      <button
        type="button"
        className={['connection-button', `connection-button--${size}`, mode].join(' ')}
        style={backgroundColor && { backgroundColor }}
        {...props}
        onClick={(e) => web3Values.isConnected ? doDisConnectWallet(e) : doConnectWallet (e) }
        >
        {web3Values.isConnected ? disconnectLabel : connectLabel}
      </button>
    </div>
  );
};

Connection.propTypes = {
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  connectLabel: PropTypes.string.isRequired,
  disconnectLabel: PropTypes.string.isRequired,
  parentWeb3Callback: PropTypes.func.isRequired,
};

Connection.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
};
