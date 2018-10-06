import React from 'react';
import { storiesOf } from '@storybook/react';
import { DefaultTabs, ColumnTabs } from '../../app/components/Tabs';

import testTabs from './test-configuration';

storiesOf('Tab systems', module)
  .add('V3 tab design (w/o controller)', () => (<DefaultTabs tabConfiguration={testTabs} />))
  .add('ColumnTabs', () => (<ColumnTabs />));
