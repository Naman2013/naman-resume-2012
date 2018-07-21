import React from 'react';
import { storiesOf } from '@storybook/react';
import LabeledTitleTiles from '../../app/components/common/style/LabeledTitleTiles';

storiesOf('LabeledTitleTiles', module)
  .add('Renders tiles based on an object of information', () => (
    <LabeledTitleTiles
      tiles={{
        type: {
          label: 'Type',
          text: 'Public'
        },
        created: {
          label: 'Created',
          text: 'Apr 13, 2018'
        },
        members: {
          label: 'Members',
          text: '3'
        }
      }}
    />
  ));
