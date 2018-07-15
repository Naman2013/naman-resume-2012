import React from 'react';
import { storiesOf } from '@storybook/react';
import DiscussionsBoard from '../../app/components/common/DiscussionsBoard/BootstrappedDiscussionsBoard';
import mock from './mockResponse'

storiesOf('Discussions Board', module)
  .add('Renders Discussions Board List of Threads', () => (
    <DiscussionsBoard
      callSource="groups"
      user={{
        cid: '310006',
        at: '3',
        token: '05ab823d9323f02d0ae3667200c5f5b8f7acbd70',
      }}
      {...mock}
    />
  ));
