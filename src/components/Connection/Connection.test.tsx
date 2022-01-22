import React from "react";
import { render } from "@testing-library/react";
import "regenerator-runtime/runtime.js";
import { ActionData, ErrorMessageData } from "../../interface/web3-data-interface";
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
            homePageurl='https://idrisbowman.com/'
            logourl='https://idrisbowman.com/images/idrisBowmanIcon.jpg'
            passweb3data={((web3Values: ActionData) => {
                web3data = web3Values;
            })}
            errorcallback={((error: ErrorMessageData) => {
                errorObject = error;
            })} infuraId={''}            
        />);
    });
});