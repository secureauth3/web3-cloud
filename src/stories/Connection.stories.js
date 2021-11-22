import React from 'react';
import { Connection } from '../components/Connection';

export default {
  title: 'Components/Connection',
  component: Connection,
};

const Template = (args) => <Connection {...args} />;

export const ConnectionStory = Template.bind({});

let web3data = null;

ConnectionStory.args = {
  primary: true,
  backgroundColor: 'blue',
  size: 'medium',
  connectLabel: 'Connect wallet',
  disconnectLabel: 'Disconnect wallet',
  parentWeb3Callback: ((web3Values) => { 
    web3Values.isConnected ? web3data  = web3Values :  web3data = null;
  }),
};

export const web3DataContainer = () => 
  <div>
    {web3data ?
       <div>
       <a href={`${web3data.networkScanner}/${web3data.account}`} target="_blank" rel="noopener noreferrer">
         Ethereum Account: {web3data.account}
       </a> 
       <p>ETH: {web3data.ethBalance}</p>
       <p>Network: {web3data.network}</p>
       <p>NetworkID: {web3data.networkId}</p>
     </div>
      :
      <p>Please connect wallet to view</p>
    }
  </div>;

web3DataContainer.storyName = 'Web3 Connection data'
