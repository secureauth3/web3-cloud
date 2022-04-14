import { Auth3ProviderData, NewUser, UserAuthData } from "./SecureAuth3Provider";
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
  } as Auth3ProviderData,
  async auth3Signup(newUser: NewUser, apiKey: string) {
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
    } else {
      const cuResult = await postUser(newUser,apiKey);
    
      if ('errors' in cuResult) {
        console.log('found errors:', cuResult);
        web3AuthProvider.authProviderData.isSignedUp = false;
        cuResult.errors.forEach((error: ErrorMultipleBody) => {
          web3AuthProvider.authProviderData.authError += `${error.msg}.`;
        });
      } else if ('error' in cuResult) {
        console.log('found error:', cuResult);
        web3AuthProvider.authProviderData.isSignedUp = false;
        web3AuthProvider.authProviderData.authError += cuResult.error;
      } else {
        console.log('no error:', cuResult);
        web3AuthProvider.authProviderData.isSignedUp = true;
      }
    }
    return web3AuthProvider.authProviderData;
  },
  async auth3Signin(userAuthData: UserAuthData, apiKey: string) {
    return web3AuthProvider.authProviderData;
  },
  async auth3SSO(apiKey: string) {
    return web3AuthProvider.authProviderData;
  },
  async auth3Signout(apiKey: string) {
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
  },
};
  
export { web3AuthProvider };
  