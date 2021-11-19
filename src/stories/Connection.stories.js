import React from 'react';

import { Connection } from '../components/Connection';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Connection',
  component: Connection,
};

const Template = (args) => <Connection {...args} />;

export const ConnectionStory = Template.bind({});

ConnectionStory.args = {
  primary: true,
  backgroundColor: 'blue',
  size: 'medium',
  connectLabel: 'Connect wallet',
  disconnectLabel: 'Disconnect wallet',
};