import { Auth3ProviderData, NewAuth3User, UserAuthData } from "./SecureAuth3Provider";
import { ErrorMultipleBody, fetchUser, postUser, verify } from "./userAPI";

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
  async auth3Signup(newUser: NewAuth3User, apiKey: string) {
    if (
      newUser.account === '' ||
      newUser.email === '' ||
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
    if (
      userAuthData.address === '' ||
      userAuthData.email === '' ||
      userAuthData.signature === '' ||
      userAuthData.message === '' ||
      apiKey === ''
    ) {
      web3AuthProvider.authProviderData.isAuthenticated = false;
      web3AuthProvider.authProviderData.authError = 'Can not use empty value to verify user.';
    } else {
  
      const verifyUserResult = await verify(userAuthData,apiKey);
      if ('errors' in verifyUserResult) {
        console.log('verify found errors:', verifyUserResult);
        web3AuthProvider.authProviderData.isAuthenticated = false;
        verifyUserResult.errors.forEach((error: ErrorMultipleBody) => {
          web3AuthProvider.authProviderData.authError += `${error.msg}.`;
        });
      } else if ('error' in verifyUserResult) {
        console.log('verify found error:', verifyUserResult);
        web3AuthProvider.authProviderData.isAuthenticated = false;
        web3AuthProvider.authProviderData.authError = verifyUserResult.error;
      } else {
        console.log('verify no error:', verifyUserResult);
        // passed verification now fetch data
        const fetchUserResult = await fetchUser(userAuthData.address,verifyUserResult.accessToken, apiKey);
        if ('error' in fetchUserResult) {
          console.log('fetch user found error:', fetchUserResult);
          web3AuthProvider.authProviderData.isAuthenticated = false;
          web3AuthProvider.authProviderData.authError = fetchUserResult.error;
        } else {
          web3AuthProvider.authProviderData.isAuthenticated = true;
          web3AuthProvider.authProviderData.accessToken = verifyUserResult.accessToken;
          web3AuthProvider.authProviderData.isSignedUp = true;
          web3AuthProvider.authProviderData.user = fetchUserResult;
        }
      }
    }
    return web3AuthProvider.authProviderData;
  },
  async auth3SSO(apiKey: string) {
    return web3AuthProvider.authProviderData;
  },
  async auth3Signout(apiKey: string) {
    return web3AuthProvider.authProviderData =  {
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
  