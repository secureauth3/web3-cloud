import React from 'react';
import { ErrorMessageData, ActionData, VerifactionType } from '../interface/web3-data-interface';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FormProps } from '../interface/form-interface';
import { Form } from '../components/Form/Form';

export default {
  title: 'Components/Form',
  component: Form,
} as ComponentMeta<typeof Form>;

let web3data: ActionData;
let errorObject: ErrorMessageData;
let API_URL: string = 'http://localhost:80';
const apiKey = '';

// test web3 Form component
const Template: ComponentStory<typeof Form> = (args: FormProps) =>
  <div>
      <Form
      primary={true}
      backgroundcolor='green'
      size='large'
      verifyinglabel='Verifiying Signature...'
      dappname='Web3 Cloud'
      infuraId=''
      logourl='https://idrisbowman.com/images/idrisBowmanIcon.jpg'
      homePageurl='https://idrisbowman.com/'
      disableErrorDisplay={false}
      backend={{
        endpoint: `${API_URL}/api/v1/auth/nonce`,
        requestOptions: {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        }
      }}
      messageToSign={`Signing this unique message will produce a digital signature that we verify to prove ownership of your wallet. Please be aware that signing will not cost any gas!`}
      passweb3data={(async (web3Values: ActionData) => {
        web3data = web3Values;
      })}
      errorcallback={(async (error: ErrorMessageData) => {
        errorObject = error;
      })}   
    />
</div>;
 
export const FormStory = Template.bind({});

// test web3 signature results
export const web3DataContainer = () => 
  <div>
    {web3data && web3data.verificationType === VerifactionType.SIWE?
       <div>
         <h1>EIP712 Verification Type Data</h1>
       <a href={`${web3data.networkScanner}/${web3data.address}`} target="_blank" rel="noopener noreferrer">
         Ethereum Account: {web3data.address}
       </a> 
       <p>Email: {web3data.email}</p>
       <p>First Name: {web3data.firstName}</p>
       <p>Last Name: {web3data.lastName}</p>
       <p>Network: {web3data.networkName}</p>
       <p>NetworkID: {web3data.chainId}</p>
       <p>Action Type: {web3data.actionType}</p>
       <hr></hr>
       <p>Signature data</p>
       <p>Signatur: {web3data.signature}</p>
     </div>
      :
      <p>Please connect wallet to view Sign in with Ethereum</p>
    }

  {/* Error messages */}
    {
      errorObject ? 
      <p>{errorObject.message}</p>
      :
      <p></p>
    }
</div>;
web3DataContainer.storyName = 'Web3 Form data';
