import { Contracts, NetworkInfo } from '../model/signature-interface';

export const SUPPORTED_NETWORKS = [4, 421611];
export const SUPPORTED_STORAGE_TYPES = ['Dynamodb'];

export const VERIFICATION_CONTRACTS = new Map<number,Contracts>([
    [4, {
        'EIP712': {
            address: '0xdC56725aE658b7AE6110507Cec09E506bEEA8410',
            abi: ['function verify(uint8 v, bytes32 r, bytes32 s, string memory action, address sender, string memory email, string memory url, string nonce, uint256 expiration) public view returns (bool)']
        },

    }],
    [421611, {
        'EIP712': {
            address: '0x0ECeF04E2686372e49C27343e1306d6674F782E5',
            abi: ['function verify(uint8 v, bytes32 r, bytes32 s, string memory action, address sender, string memory email, string memory url, string nonce, uint256 expiration) public view returns (bool)']
            },
        }
    ],
]);

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
