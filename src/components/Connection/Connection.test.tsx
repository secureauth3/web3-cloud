import React from "react";
import '';
import { render } from "@testing-library/react";
import "regenerator-runtime/runtime.js";
import { ActionData, ErrorMessageData } from "../../model/web3-data-interface";
import { Connection } from "./Connection";

describe("Connection", () => {
    let web3data: ActionData;
    let errorObject: ErrorMessageData;

    test("renders the Connection component", () => {
        render(<Connection
            primary={true}
            backgroundcolor='blue'
            size='large'
            verifyinglabel='Verfiying Signature...'
            verificationtype='EIP712'
            dappname='Web3 Cloud'
            dappid='my-dapp'
            logourl='https://idrisbowman.com/images/idrisBowmanIcon.jpg'
            passweb3data={((web3Values: ActionData) => {
                console.log('parent getting web data:', web3Values);
                web3data = web3Values;
            })}
            errorcallback={((error: ErrorMessageData) => {
                console.log('parent getting error:', error);
                errorObject = error;
            })}
            />);
    });
});