import { ButtonProps } from "./button-interface";
import { FormProps } from "./form-interface";

export interface AuthContextType {
    signin: (userAuthData: FormProps | ButtonProps, callback: VoidFunction) => void;
    singleSignin: (callback: VoidFunction) => void;
    signup: (userAuthData: FormProps| ButtonProps, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

export interface AuthData {
    address: string;
    signature: string;
    message: string;
    email: string;
}