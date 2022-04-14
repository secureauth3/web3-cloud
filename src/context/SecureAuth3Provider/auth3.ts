import { NewUser, UserAuthData } from "./SecureAuth3Provider";
import { ErrorMultipleBody, postUser } from "./userAPI";

const web3AuthProvider = {
  authProviderData: {
    isAuthenticated: false,
    isSignedUp: false,
    accessToken: '',
    authError: '',
    user: {
      account: '',
      email: '',
      dappName: '',
      firstName: '',
      lastName: '',
      ens: '',
      chainId: 0,
      permissionType: '',
      permissionFlags: 0,
      lastLogin: 0,
    },
  },
  async auth3Signup(newUser: NewUser, apiKey: string, callback: VoidFunction ) {
    if (
      newUser.account === '' ||
      newUser.email === '' ||
      newUser.firstName === '' ||
      newUser.lastName === '' ||
      newUser.ens === '' ||
      newUser.chainId == 0 ||
      apiKey === ''
    ) {
      web3AuthProvider.authProviderData.isSignedUp = false;
      web3AuthProvider.authProviderData.authError = 'Can not use empty value to create user.';
    }
    const cuResult = await postUser(newUser,apiKey);
    
    if ('errors' in cuResult) {
      web3AuthProvider.authProviderData.isSignedUp = false;
      cuResult.errors.forEach((error: ErrorMultipleBody) => {
        web3AuthProvider.authProviderData.authError += `${error.msg}.`;
      })
    }

    if ('error' in cuResult) {
      web3AuthProvider.authProviderData.isSignedUp = false;
      web3AuthProvider.authProviderData.authError += cuResult.error;
    }
    web3AuthProvider.authProviderData.isSignedUp = true;
    callback();
  },
  async auth3Signin(userAuthData: UserAuthData, apiKey: string, callback: VoidFunction) {
    callback();
  },
  async auth3SSO(apiKey: string,callback: VoidFunction) {
    callback();
  },
  async auth3Signout(apiKey: string,callback: VoidFunction) {
    web3AuthProvider.authProviderData =  {
      isAuthenticated: false,
      isSignedUp: false,
      accessToken: '',
      authError: '',
      user: {
        account: '',
        email: '',
        dappName: '',
        firstName: '',
        lastName: '',
        ens: '',
        chainId: 0,
        permissionType: '',
        permissionFlags: 0,
        lastLogin: 0,
      },
    }
    callback();
  },
};
  
export { web3AuthProvider };
  