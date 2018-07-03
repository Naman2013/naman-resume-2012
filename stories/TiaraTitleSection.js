import React from 'react';
import { storiesOf } from '@storybook/react';
import TiaraTitleSection from '../app/components/common/TiaraTitleSection';

storiesOf('TiaraTitleSection', module)
  .add('Mobile', () => (
    <TiaraTitleSection />
  ));
