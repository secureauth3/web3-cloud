import { ButtonSignatureData, Backend, ErrorMessageData } from "./web3-data-interface";

export interface ButtonProps {
    primary: boolean;
    backgroundcolor: string; 
    size: string; 
    buttonlabel: string;
    buttonDataCallback: (web3Data: ButtonSignatureData) => void;
    buttonErrorcallback: (errorData: ErrorMessageData) => void;
    dappname: string;
    infuraId: string;
    messageToSign: string;
    backend?: Backend
}