import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { profilePhotoStyle } from 'styles/mixins/utilities';
import style from './AveryTile.style';

const profPic = (photoUrl, photoSize) => Object.assign(profilePhotoStyle(photoUrl), {
  height: `${photoSize}px`,
  width: `${photoSize}px`,
  backgroundSize: 'cover',
});
const AveryTile = ({ title, iconUrl, theme, photoSize }) => (
  <div className="root avery-tile" style={theme}>
    <div className="inner-container">
      <div className="avatar-container">
        <div className="avatar-circle" style={{ height: `${photoSize + (photoSize * .10)}px`, width: `${photoSize + (photoSize * .10)}px` }} />
        <div className="avatar-line" />
        <div className="avatar-img" style={profPic(iconUrl, photoSize)} />
      </div>
      <div className="title-text" dangerouslySetInnerHTML={{ __html: title }} />
    </div>
    <style jsx>{style}</style>
  </div>
);

AveryTile.defaultProps = {
  photoSize: 100, // in pixels
  title: '',
  theme: {},
};

AveryTile.propTypes = {
  photoSize: PropTypes.string,
  title: PropTypes.string,
  theme: PropTypes.shape({}),
  iconUrl: PropTypes.string.isRequired,
};

export default AveryTile;
