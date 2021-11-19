import Web3 from 'web3';

const NETWORKS = {
    '1': 'Mainnet Ethereum',
    '3': 'Ropsten Ethereum',
    '42': 'Kovan Ethereum',
    '4': 'Rinkeby Ethereum',
    '5777': 'Ethereum Local',
    '421611': 'Arbitrum Rinkeby',
    '42161': 'Arbitrum Mainnet',
    '10': 'Arbitrum Local'
};
  

const SCANNERS = {
    '1': 'https://etherscan.io/address',
    '3': 'https://ropsten.etherscan.io/address',
    '42': 'https://kovan.etherscan.io/address',
    '4': 'https://rinkeby.etherscan.io/address',
    '5777': 'https://etherscan.io/address',
    '421611': 'https://rinkeby-explorer.arbitrum.io/address',
    '42161': 'https://explorer.offchainlabs.com/address',
};

const Web3Service = {
   
    loadWeb3: async () => {
        if(typeof window.ethereum !== 'undefined'){
            window.ethereum.autoRefreshOnNetworkChange = false;
            const web3 = new Web3(window.ethereum);
            return web3
        } else {
            window.alert('Please install MetaMask')
            window.location.assign("https://metamask.io/")
        }
    },
      
    loadNetwork: async (web3) => {
        try{
            let network;
            const networkId = await web3.eth.net.getId()
            network = NETWORKS[networkId.toString()] 
            const networkObj = {
                network,
                networkId,
                scanner: SCANNERS[networkId.toString()]
            };
            return networkObj;
        } catch (e) {
            console.log('Error, load network: ', e);
            return null;
        }
    },
      
    loadAccount: async () => {
        if(typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = await accounts[0]
        
            if(typeof account !== 'undefined') {
                return account.toLowerCase()
            } else {
                window.alert('Please install MetaMask')
                window.location.assign("https://metamask.io/")
                return '';
            }
        }
    },
    
    loadEthBalance: async (web3, account) => {
        try {
            const etherBalance = await web3.eth.getBalance(account)
            return (etherBalance/10**18).toFixed(2);        
        } catch (e) {
            console.log('Error, load balance: ', e);
            return 0;
        }
    },
};

export default Web3Service;