import React from 'react';
import PropTypes from 'prop-types';
import style from './image-portal.style';

const ImagePortal = ({ src, alt }) => (
  <div className="image-portal-root">
    <div
      className="image-clip"
      style={{
        background: `url(${src}) no-repeat 0 0`,
        backgroundSize: 'cover',
      }}
    />
    <style jsx>{style}</style>
  </div>
);

ImagePortal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

ImagePortal.defaultProps = {
  alt: '',
};

export { ImagePortal };
