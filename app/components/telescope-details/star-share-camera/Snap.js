import React from 'react';
import PropTypes from 'prop-types';
import { backgroundImageCover } from '../../../styles/mixins/utilities';

const propTypes = {
  imageURL: PropTypes.string,
};

const defaultProps = {
  imageURL: '',
};

const Snap = ({ imageURL }) => {
  if (!imageURL) {
    return null;
  }

  return (
    <div className="root" style={{ backgroundImage: `url(${imageURL})` }}>
      <style jsx>{backgroundImageCover}</style>
      <style jsx>{`
        .root {
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
