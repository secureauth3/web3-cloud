const CryptoJS = require('crypto-js');
import { SUPPORTED_STORAGE_TYPES } from '../service-constants';

class CryptographyService {
    /* 400 KB(4000 bytes) encypted string limit for Dynamodb
        Dynamodb Strings are constrained by the maximum item size of 400 KB
        https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html
    */
    encrypt(secretKey: string, data: any, storageType = 'Dynamodb') {
        try {
            if (typeof data !== 'object') return {message: 'Not vaild Javascript object.', encryptedData: null};
            if (Array.isArray(data)) return {message: 'We do not support encryption of arrays.', encryptedData: null};
            if (data === null) return {message: 'Data to encrypt must not be empty.', encryptedData: null};
            if (secretKey === '') return {message: 'Secret Key to encrypt must not be empty.', encryptedData: null};
            if (storageType === '') return {message: 'Storage Type must not be empty.', encryptedData: null};
            if (SUPPORTED_STORAGE_TYPES.indexOf(storageType) === -1) return {message: 'Storage Type not supported.', encryptedData: null};

            const stringObj = JSON.stringify(data);
            const ciphertext = CryptoJS.AES.encrypt(stringObj, secretKey).toString();
            const byteSize =  Buffer.byteLength(ciphertext, 'utf8');

            if ((storageType === 'Dynamodb') && (byteSize > 4000)) return {message: 'Dynamodb Strings are constrained by the maximum item size of 400 KB', encryptedData: null};

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

    decrypt(secret: string, encryptedData: any) {
        try {
            if (typeof encryptedData !== 'string') return {message: 'Not vaild Javascript string.', decryptedData: null};
            if (secret === '') return {message: 'Secret Key to encrypt must not be empty.', encryptedData: null};

            const bytes = CryptoJS.AES.decrypt(encryptedData, secret);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            return {
                decryptedData
            };
        } catch (error) {
            return {
                message: 'Error occuried please try again',
                encryptedData: null
            };
        }
    }
}

export default CryptographyService;