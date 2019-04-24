import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { profilePhotoStyle } from 'app/styles/mixins/utilities';
import style from './AveryTile.style';

const profPic = (photoUrl, photoSize) => Object.assign(profilePhotoStyle(photoUrl), {
  height: `${photoSize}px`,
  width: `${photoSize}px`,
  backgroundSize: 'cover',
});
const AveryTile = ({ title, iconUrl, theme, photoSize }) => (
  <div className="root avery-tile" style={theme}>
    <div className={classnames('inner-container', { 'no-image': !iconUrl })}>
      {iconUrl ? <div className="avatar-container">
        <div className="avatar-circle" style={{ height: `${photoSize + (photoSize * .10)}px`, width: `${photoSize + (photoSize * .10)}px` }} />
        <div className="avatar-line" />
        <div className="avatar-img" style={profPic(iconUrl, photoSize)} />
      </div> : null}
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
  photoSize: PropTypes.number,
  title: PropTypes.string,
  theme: PropTypes.shape({}),
  iconUrl: PropTypes.string.isRequired,
};

export default AveryTile;
