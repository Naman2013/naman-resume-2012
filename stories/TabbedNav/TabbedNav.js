import React from 'react';
import { storiesOf } from '@storybook/react';
import TabbedNav from '../../app/components/TabbedNav';

let activeTab = 0;
const changeActiveTab = (idx) => {
  activeTab = idx;
};

const tabs = [
  {
    label: 'Step 1',
    value: 0,
  },
  {
    label: 'Step 2',
    value: 1,
  },
  {
    label: 'Step 3',
    value: 2,
  },
];

storiesOf('TabbedNav', module)
  .add('Renders clickable tabs', () => (
    <TabbedNav
      tabs={[tabs]}
      activeTab={activeTab}
      onTabClick={changeActiveTab}
    />
  ));
