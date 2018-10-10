import React from 'react';
import PropTypes from 'prop-types';
import GenericButton from 'components/common/style/buttons/Button';
import starShareCamera from 'atoms/icons/star-share-camera.svg';
import { info } from 'styles/variables/iconURLs';
import style from './star-share-camera.style';

const StarShareCamera = () => (
  <div className="star-share-camera-root">
    <ul className="action-list">
      <li><GenericButton icon={info} /></li>
      <li><GenericButton theme={{ width: '60px', height: '60px' }} icon={starShareCamera} /></li>
      <li><GenericButton icon={info} /></li>
    </ul>

    <style jsx>{style}</style>
  </div>
);

export { StarShareCamera };
