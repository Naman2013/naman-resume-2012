import React from 'react';
import { storiesOf } from '@storybook/react';
import CenterColumn from '../app/components/common/CenterColumn';

storiesOf('CenterColumn', module)
  .add('Default', () => (
    <CenterColumn theme={{ backgroundColor: 'aqua' }}>
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h1>Sample header</h1>
        <p>Sample content</p>
      </div>
    </CenterColumn>
  ));
