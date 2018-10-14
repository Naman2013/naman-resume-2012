import React from 'react';
import { storiesOf } from '@storybook/react';
import eclipseArtwork from '../assets/images/photos/eclipse-artwork-2.jpg';
import { ModuleContainer, WhereInTheSky, AllSkyCamera, ImagePortal } from 'components/telescope-details/v4-modules';

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
  ));
