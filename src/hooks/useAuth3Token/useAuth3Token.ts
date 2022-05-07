import LocalStorageService from "../../services/LocalStorage/local-storage"

export const useAuth3Token = () => {
    const getAccessToken = (tokenSecret: string) => {
        return LocalStorageService.Instance.getAuth3Token(tokenSecret);
    }

    const setAuth3Token = (accessToken: string, refreshToken: string, tokenSecret: string) => {
        return LocalStorageService.Instance.setAuth3Token(accessToken, refreshToken, tokenSecret);
    }

    const setWalletStatus = (isWalletConnected: string, walletName: string) => {
        return LocalStorageService.Instance.setWalletStatus(isWalletConnected, walletName);
    }
    const getWalletName = () => {
        return LocalStorageService.Instance.getWalletStatus();
    }

    const localSignout = () => {
        return LocalStorageService.Instance.localSignout();
    }
    return {
        getAccessToken,
        setAuth3Token,
        setWalletStatus,
        getWalletName,
        localSignout
    }
}