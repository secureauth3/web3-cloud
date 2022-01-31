import { NetworkInfo } from '../interface/signature-interface';

export const CHAINID_NETWORK_MAP = new Map<number, NetworkInfo>([
    [1, {
        name: 'Mainnet Ethereum',
        scannerUrl: 'https://etherscan.io/address'
        }
    ],
    [3, {
        name: 'Ropsten Test Network',
        scannerUrl:'https://ropsten.etherscan.io/address'
        }
    ],
    [42, {
        name: 'Kovan Test Network',
        scannerUrl:'https://kovan.etherscan.io/address'
        }
    ],
    [4, {
        name: 'Rinkeby Test Network',
        scannerUrl:'https://rinkeby.etherscan.io/address'
        }
    ],
    [5777, {
        name: 'Ethereum Local',
        scannerUrl:'https://etherscan.io/address'
        }
    ],
    [421611, {
        name: 'Arbitrum Rinkeby',
        scannerUrl:'https://rinkeby-explorer.arbitrum.io/address'
        }
    ],
    [42161, {
        name: 'Arbitrum Mainnet',
        scannerUrl:'https://explorer.offchainlabs.com/address'
        }
    ],
]);
