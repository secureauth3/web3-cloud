import CryptoJS from 'crypto-js';

export interface Auth3Token {
  accessToken: string;
  refreshToken: string;
}

class LocalStorageService {
  private static _instance: LocalStorageService;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private encrypt(secretKey: string, data: string) {
    try {
        if (typeof data !== 'string') return {message: 'Data must be out type string', encryptedData: null};
        const ciphertext = CryptoJS.AES.encrypt(data, secretKey).toString();
        return {
            encryptedData: ciphertext
        };
    } catch (error) {
        return {
            message: 'Error occuried please try again',
            encryptedData: null
        };
    }
  }
  
  private decrypt(secretKey: string, encryptedData: string) {
      try {
          if (typeof encryptedData !== 'string') return {message: 'Data must be out type string', decryptedData: null};
          if (secretKey === '') return {message: 'Secret Key to encrypt must not be empty.', decryptedData: null};
  
          const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
  
          return {
              decryptedData: bytes
          };
      } catch (error) {
          console.log('error:', error);
          return {
              message: 'Error occuried please try again',
              decryptedData: null
          };
      }
  }

  public localSignout() {
    localStorage.removeItem('encryptedRefreshToken');
    localStorage.removeItem('encryptedAccessToken');
    localStorage.removeItem('isWalletConnected');
    localStorage.removeItem('walletConnectedProvider');
  }
  
  public setAuth3Token(accessToken: string, refreshToken: string, tokenSecret: string) {
    const accessDataReady = this.encrypt(tokenSecret, accessToken);
    const refreshDataReady = this.encrypt(tokenSecret, refreshToken);

    if (accessDataReady.encryptedData && refreshDataReady.encryptedData) {
      localStorage.setItem('encryptedAccessToken', accessDataReady.encryptedData);
      localStorage.setItem('encryptedRefreshToken', refreshDataReady.encryptedData);
    }
  }
  
  public getAuth3Token(tokenSecret: string): Auth3Token {
    try {
        const encryptedRefreshToken = localStorage?.getItem('encryptedRefreshToken');
        const encryptedAccessToken = localStorage?.getItem('encryptedAccessToken');

        if (encryptedRefreshToken && encryptedAccessToken) {
          const decryptedAccessToken = this.decrypt(tokenSecret, encryptedAccessToken);
          const decryptedRefreshToken = this.decrypt(tokenSecret, encryptedRefreshToken);
          if (!decryptedRefreshToken.decryptedData || !decryptedAccessToken.decryptedData) {
            return {
              accessToken: '',
              refreshToken: ''
            };
          }
          return {
            accessToken: decryptedAccessToken.decryptedData,
            refreshToken: decryptedRefreshToken.decryptedData
          }
        } else {
          return {
            accessToken: '',
            refreshToken: ''
          };
        }
      } catch (err) {
        return {
          accessToken: '',
          refreshToken: ''
        };
    }
  }

  public setWalletStatus(isWalletConnected: string, walletName: string) {
      localStorage.setItem('isWalletConnected', `${isWalletConnected}`);
      localStorage.setItem('walletConnectedProvider', walletName);
  }

  public getWalletStatus(): string {
    try {
        const isConnected = localStorage?.getItem('isWalletConnected');
        const walletConnectedProvider = localStorage?.getItem('walletConnectedProvider');
        if (isConnected === 'true' && walletConnectedProvider) {
            return walletConnectedProvider;
        } else {
            return '';
        }
    } catch (err) {
        return '';
    }
  }
}

export default LocalStorageService;