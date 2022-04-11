import { ActionData, Backend, ErrorMessageData } from "./web3-data-interface";

export interface ButtonProps {
    primary: boolean;
    backgroundcolor: string; 
    size: string; 
    buttonlabel: string;
    verifyinglabel: string;
    passSignedCallback: (web3Data: ActionData) => void;
    errorcallback: (errorData: ErrorMessageData) => void;
    dappname: string;
    infuraId: string;
    messageToSign: string;
    backend?: Backend
}