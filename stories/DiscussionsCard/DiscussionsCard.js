import React from 'react';
import { storiesOf } from '@storybook/react';
import DeviceProvider from 'providers/DeviceProvider';
import DiscussionsCard from '../../app/components/common/DiscussionsCard';
import { mockThread, mockReply } from './mockResponses'

storiesOf('Discussions Card', module)
  .addDecorator(getStory => <DeviceProvider>{getStory()}</DeviceProvider>)
  .add('Renders a card for Threads', () => (
    <DiscussionsCard
      callSource="groups"
      user={{
        cid: '310006',
        at: '3',
        token: '05ab823d9323f02d0ae3667200c5f5b8f7acbd70',
      }}
      {...mockThread}
    />
  ))
  .add('Renders a card for Replies', () => (
    <DiscussionsCard
      callSource="groups"
      user={{
        cid: '310006',
        at: '3',
        token: '05ab823d9323f02d0ae3667200c5f5b8f7acbd70',
      }}
      {...mockReply}
    />
  ));
