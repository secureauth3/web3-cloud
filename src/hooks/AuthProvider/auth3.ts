import { ButtonProps } from "../../interface/button-interface";
import { FormProps } from "../../interface/form-interface";

const web3AuthProvider = {
  isAuthenticated: false,
  isSignedUp: false,
  accessToken: '',
  authError: '',
  user: {},
  async signup(userData: FormProps | ButtonProps, callback: VoidFunction) {
    callback();
  },
  async signin(userData: FormProps | ButtonProps, callback: VoidFunction) {
    callback();
  },
  async singleSignin(callback: VoidFunction) {
    callback();
  },
  async signout(callback: VoidFunction) {
    web3AuthProvider.isAuthenticated = false;
    web3AuthProvider.isSignedUp = false;
    web3AuthProvider.accessToken = '';
    web3AuthProvider.user = {};
    callback();
  },
};
  
export { web3AuthProvider };
  