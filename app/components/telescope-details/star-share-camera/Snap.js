import React from 'react';
import PropTypes from 'prop-types';
import { backgroundImageCover } from '../../../styles/mixins/utilities';

const propTypes = {
  imageURL: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

const defaultProps = {
  imageURL: '',
  width: '50px',
  height: '50px',
};

const Snap = ({ imageURL, width, height }) => {
  if (!imageURL) {
    return null;
  }

  return (
    <div
      className="root"
      style={{ backgroundImage: `url(${imageURL})`, width, height }}
    >
      <style jsx>{`
        .root {
          ${backgroundImageCover}
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

Snap.propTypes = propTypes;
Snap.defaultProps = defaultProps;

export default Snap;
