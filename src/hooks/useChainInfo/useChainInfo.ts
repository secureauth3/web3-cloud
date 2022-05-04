import { CHAINID_NETWORK_MAP } from "../../services/service-constants";

export const useChainInfo = () => {
    const getChainInfo =  (chainIdUpdated: number) => {
        const networkInfo = CHAINID_NETWORK_MAP.get(chainIdUpdated);
        if (networkInfo) {
            return {
                networkName: networkInfo.name,
                networkScanner: networkInfo.scannerUrl
            }
        } else {
            return {
                networkName:  '',
                networkScanner: ''
            }
        }
    }
    return {
        getChainInfo,
    }
    
}