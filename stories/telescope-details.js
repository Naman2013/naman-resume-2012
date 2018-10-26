import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  ModuleContainer,
  WhereInTheSky,
  AllSkyCamera,
  ImagePortal,
  QueueNavigation,
  Satellite,
  TelescopeDetail,
  ObservatoryInformation,
} from 'components/telescope-details/v4-modules';

import eclipseArtwork from '../assets/images/photos/eclipse-artwork-2.jpg';

storiesOf('Telescope Details Modules', module)
  .add('ModuleContainer: base for other modules', () => (
    <ModuleContainer title="Test title" />
  ))
  .add('WhereInTheSky', () => (
    <WhereInTheSky />
  ))
  .add('AllSkyCamera', () => (
    <AllSkyCamera />
  ))
  .add('ImagePortal', () => (
    <ImagePortal src={eclipseArtwork} alt="Eclipse" />
  ))
  .add('QueueNavigation', () => (
    <QueueNavigation
      handlePrevClick={() => {}}
      handleNextClick={() => {}}
      title="Mon. Jan 06"
    />
  ))
  .add('Satellite', () => (<Satellite />))
  .add('TelescopeDetail', () => (<TelescopeDetail />))
  .add('ObservatoryInformation', () => (<ObservatoryInformation />));
