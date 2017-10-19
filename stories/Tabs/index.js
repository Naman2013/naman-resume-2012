import React from 'react';
import { storiesOf } from '@storybook/react';
import DefaultTabs from '../../app/components/Tabs';

import testTabs from './test-configuration';

storiesOf('Tab systems', module)
  .add('Several options',
    () => <DefaultTabs tabConfiguration={testTabs} />);
