/***********************************
* V4 Observer Info
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import uniqueId from 'lodash/uniqueId';
import { profilePhotoStyle } from 'styles/mixins/utilities';
import { darkGray, lightGray, gray } from 'styles/variables/colors';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { aspectRatio, backgroundImageCover } from '../../styles/mixins/utilities';


const {
  arrayOf,
  bool,
  shape,
  string,
} = PropTypes;

const profPic = photoUrl => Object.assign(profilePhotoStyle(photoUrl), {
  height: '105px',
  width: '105px',
  backgroundSize: 'cover',
});

const ObserverInfo = ({
  avatarURL,
  isDesktop,
  displayName,
  gravityRankLabel,
}) => (<div className="root component-container">
  {isDesktop ? <div className="title-container">
    <span className="title">Observer:</span>
  </div> : null}
  <div className="observer-info-container">
    {!isDesktop ? <div className="title">Observer:</div> : null }
    <div className="flex-item">
      <span className="name" dangerouslySetInnerHTML={{ __html: displayName }} />
      <span className="gravity-desc" dangerouslySetInnerHTML={{ __html: gravityRankLabel }} />
    </div>
    <div className="avatar-container flex-item">
      <div className="observer-avatar" style={profPic(avatarURL)} />
      <div className="avatar-line"/>
    </div>
  </div>

  <style jsx>{`
    .component-container {
      margin: 25px;
      -moz-box-shadow: 0 2px 4px 1px ${gray};
      -webkit-box-shadow: 0 2px 4px 1px ${gray};
      box-shadow: 0 2px 4px 1px ${gray};
    }

    .title-container {
      text-transform: uppercase;
      color: ${darkGray};
      font-weight: bold;
      font-size: 12px;
      border-bottom: 4px solid ${darkGray};
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .title {
      padding: 25px;
      text-align: center;
      width: 100%;
    }

    .observer-info-container {
      display: flex;
      flex-direction: column;
      padding: 25px;
      flex-wrap: wrap;
    }

    .name {
      display: block;
      font-size: 20px;
      color: ${darkGray};
      font-family: ${secondaryFont};
      padding: 5px 0;
    }

    .avatar-container {
      position: relative;
    }

    .observer-avatar {
      margin: 25px auto;
      position: relative;
      z-index: 1;
    }

    .avatar-line {
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 100%;
      border-right: 1px solid ${gray};
    }

    .flex-item {
      flex: 0 50%;
    }

    .gravity-desc {
      display: block;
      text-align: center;
      padding: 5px 0;
      border-top: 1px solid ${gray};
      border-bottom: 1px solid ${gray};
      font-size: 10px;
      font-family: ${primaryFont};
      text-transform: uppercase;
      font-weight: bold;
    }

    @media all and (min-width: 641px) and (max-width: 768px) {

      .observer-info-container {
        flex-direction: row;
      }

      .observer-avatar {
        margin: 0 auto;
      }

      .title {
        flex: 0 0 100%;
        font-size: 11px;
        text-align: left;
        padding: 10px 0;
      }

      .avatar-line {
        display: none;
      }
    }
    @media all and (max-width: 640px){
      .observer-info-container {
        flex-direction: row;
      }

      .observer-avatar {
        margin: 0 auto;
      }

      .title {
        flex: 0 0 100%;
        font-size: 11px;
        text-align: left;
        padding: 10px 0;
      }
      .avatar-line {
        display: none;
      }
    }

  `}</style>
</div>);

ObserverInfo.propTypes = {
  isDesktop: bool,
  avatarURL: string,
  displayName: string,
  gravityRankLabel: string,

}

ObserverInfo.defaultProps = {
  isDesktop: false,
  avatarURL: '',
  displayName: '',
  gravityRankLabel: '',
};

export default ObserverInfo;
