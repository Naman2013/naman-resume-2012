import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { profilePhotoStyle } from 'styles/mixins/utilities';
import style from './AveryTile.style';

const profPic = photoUrl => Object.assign(profilePhotoStyle(photoUrl), {
  height: '50px',
  width: '50px',
  backgroundSize: 'cover',
});
const AveryTile = ({ title, avatarURL }) => (
  <div className="root">
    <div className="inner-container">
      <div className="avatar-container">
        <div className="avatar-img" style={profPic(avatarURL)} />
        <div className="avatar-line" />
        <div className="avatar-circle" />
      </div>
      <div className="title-text" dangerouslySetInnerHTML={{ __html: title }} />
    </div>
    <style jsx>{style}</style>
  </div>
);

AveryTile.defaultProps = {
  title: '',
};

AveryTile.propTypes = {
  title: PropTypes.string,
  avatarURL: PropTypes.string.isRequired,
};

export default AveryTile;
