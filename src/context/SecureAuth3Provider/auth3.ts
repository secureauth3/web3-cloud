import { ButtonProps } from "../../components/Button/Button";
import { FormProps } from "../../components/Form/Form";

const web3AuthProvider = {
  isAuthenticated: false,
  isSignedUp: false,
  accessToken: '',
  authError: '',
  user: {},
  async auth3Signup(userData: FormProps | ButtonProps, apiKey: string, callback: VoidFunction) {
    callback();
  },
  async auth3Signin(userData: FormProps | ButtonProps, apiKey: string, callback: VoidFunction) {
    callback();
  },
  async auth3SSO(apiKey: string,callback: VoidFunction) {
    callback();
  },
  async auth3Signout(apiKey: string,callback: VoidFunction) {
    web3AuthProvider.isAuthenticated = false;
    web3AuthProvider.isSignedUp = false;
    web3AuthProvider.accessToken = '';
    web3AuthProvider.user = {};
    callback();
  },
};
  
export { web3AuthProvider };
  