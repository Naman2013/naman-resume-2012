import React from 'react';
import { storiesOf } from '@storybook/react';
import TelescopeThumbnailView from '../app/components/TelescopeThumbnailView';

storiesOf('Telescope thumbnail view', module)
  .add('View', () => (
    <TelescopeThumbnailView />
  ));
