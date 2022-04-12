import React from "react";
import { render } from "@testing-library/react";
import "regenerator-runtime/runtime.js";
import { FormSignatureData, ErrorMessageData } from "../../interface/web3-data-interface";
import { Form } from "./Form";

describe("Form", () => {
    let web3data: FormSignatureData;
    let errorObject: ErrorMessageData;

    test("renders the Form component", () => {
        render(<Form
            primary={true}
            backgroundcolor='blue'
            size='large'
            dappname='Web3 Cloud'
            homePageurl='https://idrisbowman.com/'
            logourl='https://idrisbowman.com/images/idrisBowmanIcon.jpg'
            formDataCallback={((web3Values: FormSignatureData) => {
                web3data = web3Values;
            })}
            formErrorcallback={((error: ErrorMessageData) => {
                errorObject = error;
            })} 
            infuraId={''}
            disableErrorDisplay={false}
            messageToSign={""} 
            />);
    });
});