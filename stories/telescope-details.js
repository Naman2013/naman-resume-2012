import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import {
  ModuleContainer,
  WhereInTheSky,
  AllSkyCamera,
  ImagePortal,
  QueueNavigation,
  Satellite,
  TelescopeNavigation,
} from 'components/telescope-details/v4-modules';

import eclipseArtwork from '../assets/images/photos/eclipse-artwork-2.jpg';

class TelescopeNavigationWrapper extends Component {
  state = { selectedOption: 0 }
  handleOptionChange = (event) => {
    this.setState({ selectedOption: event.target.value });
  }
  render() {
    return (
      <TelescopeNavigation
        options={[
          { name: 'Canary one', thumbnailURL: '' },
          { name: 'Canary two', thumbnailURL: '' },
          { name: 'Canary three', thumbnailURL: '' },
          { name: 'Chile', thumbnailURL: '' },
        ]}
        onSelect={this.handleOptionChange}
        selectedIndex={this.state.selectedOption}
      />
    );
  }
}

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
  .add('Telescope Navigation', () => (<TelescopeNavigationWrapper />));
