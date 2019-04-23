import React from 'react';
import PropTypes from 'prop-types';
import style from './image-portal.style';

const ImagePortal = ({ src }) => (
  <div className="image-portal-root">
    <div
      className="image-clip"
      style={{
        background: `url(${src}) no-repeat center center`,
      }}
    />
    <style jsx>{style}</style>
  </div>
);

ImagePortal.propTypes = {
  src: PropTypes.string.isRequired,
};

export { ImagePortal };
