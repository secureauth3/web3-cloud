import { FormSignatureData, Backend, ErrorMessageData } from "./web3-data-interface";

export interface FormProps {
    primary: boolean;
    backgroundcolor: string; 
    size: string; 
    formDataCallback: (web3Data: FormSignatureData) => void;
    formErrorcallback: (errorData: ErrorMessageData) => void;
    dappname: string;
    logourl: string;
    infuraId: string;
    homePageurl: string;
    disableErrorDisplay: boolean;
    messageToSign: string;
    backend?: Backend
}