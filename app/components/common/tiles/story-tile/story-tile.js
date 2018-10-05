import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AveryTile from 'components/common/tiles/AveryTile';
import style from './story-tile.style';

const StoryTile = ({ title, imageUrl, isMobile, photoSize }) => {
  const mobileStyles = {
    height: '200px',
    width: '300px',
    margin: '0 auto',
  };

  const nonMobileStyles = {
    height: '300px',
    width: '300px',
  };

  const theme = isMobile ? mobileStyles : nonMobileStyles;
  return (
    <div className="root">
      <AveryTile title={title} iconUrl={imageUrl} theme={theme} photoSize={photoSize} />
      <style jsx>{style}</style>
    </div>
  );
};

StoryTile.propTypes = {
  photoSize: PropTypes.number,
  isMobile: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default StoryTile;
