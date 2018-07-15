import React from 'react';
import PropTypes from 'prop-types';
import { DeviceContext } from 'providers/DeviceProvider';
import style from './FeaturedGallery.style';
import SterlingTitle from 'components/common/titles/SterlingTitle';

const titleTheme = {};
const titleThemeMedium = { title: { color: 'white' }, subTitle: { color: 'white' } };

const FeaturedGallery = () => (
  <div className="root">
    <DeviceContext.Consumer>
      {context => (<SterlingTitle
        title="Featured observation"
        subTitle="Community observation"
        theme={(context.isScreenMedium) ? titleThemeMedium : titleTheme}
      />)}
    </DeviceContext.Consumer>
    <style jsx>{style}</style>
  </div>
);

export default FeaturedGallery;
