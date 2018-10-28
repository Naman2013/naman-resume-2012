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
        title="Great barred spiral galaxy"
        options={[
          { name: 'Canary one', thumbnailURL: 'https://polaris.slooh.com/teide/2/highmag/2018/10/24/0310_zetaaurigae/zetaaurigae_20181024_031235_0_wjwpsb_rgb.png' },
          { name: 'Canary two', thumbnailURL: 'https://polaris.slooh.com/chile/1/widefield/2018/10/23/0825_ic2599/ic2599_20181023_082645_0_yac71p_lrgb.png' },
          { name: 'Canary three', thumbnailURL: 'https://polaris.slooh.com/chile/1/highmag/2018/10/23/0805_ngc2362/ngc2362_20181023_080658_0_jdkoh8_lrgb.png' },
          { name: 'Chile', thumbnailURL: 'https://polaris.slooh.com/chile/1/highmag/2018/10/23/0755_waxinggibbousmoon/waxinggibbousmoon_20181023_075558_0_9nxhzu_b.png' },
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
