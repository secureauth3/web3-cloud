import React from 'react';
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from '../components/Button';
import { ButtonSignatureData, ErrorMessageData } from '../interface/web3-data-interface';
import { ButtonProps } from '../interface/button-interface';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

let web3data: ButtonSignatureData;
let errorObject: ErrorMessageData;

const Template: ComponentStory<typeof Button> = (args: ButtonProps) =>
  <div>
      <Button
      primary={true}
      backgroundcolor='green'
      size='large'
      buttonlabel='Sign in with wallet'
      dappname='Web3 Cloud'
      infuraId='dd42793ccfce464e853f96164d654db9'
      messageToSign={`Signing this unique message will produce a digital signature that we verify to prove ownership of your wallet. Please be aware that signing will not cost any gas!`}
      buttonDataCallback={(async (web3Values: ButtonSignatureData) => {
        web3data = web3Values;
      })}
      buttonErrorcallback={(async (error: ErrorMessageData) => {
        errorObject = error;
      })}   
    />
</div>;

export const ButtonStory = Template.bind({});
