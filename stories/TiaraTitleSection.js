import React from 'react';
import { storiesOf } from '@storybook/react';
import TiaraTitleSection from '../app/components/common/TiaraTitleSection';

storiesOf('TiaraTitleSection', module)
  .add('Default', () => (
    <TiaraTitleSection
      preTitle="A guide to"
      title="The solar system"
      iconURL="https://vega.slooh.com/icons/home/observatory.png"
    />
  ));
