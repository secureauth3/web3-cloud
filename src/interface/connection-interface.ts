import { ActionData, ErrorMessageData } from "./web3-data-interface";

export interface ConnectionProps {
    primary: any;
    backgroundcolor: string; 
    size: string; 
    verifyinglabel: string;
    passweb3data: (web3Data: ActionData) => void;
    errorcallback: (errorData: ErrorMessageData) => void;
    verificationtype: string;
    dappname: string;
    logourl: string;
    dappid: string;
    infuraId: string;
    homePageurl: string;
}