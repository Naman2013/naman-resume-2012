import React from 'react';
import PropTypes from 'prop-types';
import GenericButton from 'app/components/common/style/buttons/Button';
import starShareCamera from 'atoms/icons/star-share-camera.svg';
import { info } from 'app/styles/variables/iconURLs';
import style from './star-share-camera.style';

const StarShareCamera = ({ snapImage }) => (
  <div className="star-share-camera-root">
    <ul className="action-list">
      <li>
        <GenericButton icon={info} />
      </li>
      <li>
        <GenericButton
          theme={{ width: '60px', height: '60px' }}
          icon={starShareCamera}
          onClickEvent={snapImage}
        />
      </li>
      <li>
        <GenericButton icon={info} />
      </li>
    </ul>

    <style jsx>{style}</style>
  </div>
);

StarShareCamera.propTypes = {
  snapImage: PropTypes.func,
};

StarShareCamera.defaultProps = {
  snapImage: () => {
  
  },
};

export { StarShareCamera };
