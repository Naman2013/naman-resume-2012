import React from 'react';
import { storiesOf } from '@storybook/react';
import Timestamp from '../app/components/common/Timestamp';

const START_TIME = 1499570100;

storiesOf('Timestamp', module)
  .add('EST/EDT/PST/PDT UTC', () => (
    <Timestamp timestampInSeconds={START_TIME} />
  ));
