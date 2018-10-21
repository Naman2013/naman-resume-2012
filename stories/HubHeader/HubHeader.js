import React from 'react';
import { storiesOf } from '@storybook/react';
import HubHeader from 'components/common/HubHeader';
import { horizontalArrow } from 'styles/variables/iconURLs';

storiesOf('HubHeader', module)
  .add('Renders main header for hubs', () => (
    <HubHeader
      title="Guides"
      icon={horizontalArrow}
    />
  ));
