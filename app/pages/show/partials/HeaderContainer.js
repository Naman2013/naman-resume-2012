import React from 'react';
import PropTypes from 'prop-types';
import VideoImageLoader from 'components/common/telescope-image-loader/video-image-loader';
import MonotonousTile from 'components/common/tiles/MonotonousTile'
import styles from './HeaderContainer.style';

const {
  arrayOf,
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const HeaderContainer = ({
  isScreenLarge,
  isScreenMedium,
  title,
  showStreamURL,
  showStreamCode,
}) => {
  // const height = '320';
  const width = '100';
  const videoContainerStyle = { width: `${width}%` };
  return (
    <div>
      {/*  Dropdown component + mute */}
      <div style={videoContainerStyle} className="video-container">
        <VideoImageLoader
          teleStreamCode={showStreamCode}
          teleStreamURL={showStreamURL}
          showVideoControls={1}
          showInfo={1}
        />
      </div>
      <MonotonousTile label="Airing Now" text={title} />
      <style jsx>{styles}</style>
    </div>
  );
};

HeaderContainer.propTypes = {
  isScreenLarge: bool,
  isScreenMedium: bool,
};

HeaderContainer.defaultProps = {
  isScreenLarge: true,
  isScreenMedium: false,
};
export default HeaderContainer;
