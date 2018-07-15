import React from 'react';
import PropTypes from 'prop-types';
import style from './FeaturedGallery.style';
import SterlingTitle from 'components/common/titles/SterlingTitle';

const FeaturedGallery = () => (
  <div className="root">
    <SterlingTitle
      title="Featured observation"
      subTitle="Community observation"
      theme={{ title: { color: 'white' }, subTitle: { color: 'white' } }}
    />
    <style jsx>{style}</style>
  </div>
);

export default FeaturedGallery;
