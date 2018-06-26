import React from 'react';
import { storiesOf } from '@storybook/react';
import DiscussionsBoard from '../../app/components/common/DiscussionsBoard';

storiesOf('Discussions Board', module)
  .add('Renders Discussions Board List of Threads', () => (
    <DiscussionsBoard topicId={1300} />
  ));
