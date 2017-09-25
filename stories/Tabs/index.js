import React from 'react';
import { storiesOf } from '@storybook/react';
import DefaultTabs from '../../app/components/Tabs';

storiesOf('Tab systems', module)
  .add('Several options', () => <DefaultTabs />);
