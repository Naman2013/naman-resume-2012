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
import { astronaut, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { aspectRatio, backgroundImageCover, dropShadowContainer } from '../../styles/mixins/utilities';
import { screenMedium } from 'styles/variables/breakpoints';


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
      <div className="avatar-line" />
    </div>
  </div>

  <style jsx>{`
    .component-container {
      margin: 25px;
      ${dropShadowContainer}
    }

    .title-container {
      text-transform: uppercase;
      color: ${astronaut};
      font-weight: bold;
      font-size: 12px;
      border-bottom: 4px solid ${astronaut};
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .observer-info-container {
      display: flex;
      flex-direction: row;
      padding: 25px;
      flex-wrap: wrap;
    }

    .name {
      display: block;
      font-size: 20px;
      color: ${astronaut};
      font-family: ${secondaryFont};
      padding: 5px 0;
    }

    .avatar-container {
      position: relative;
    }


    .flex-item {
      flex: 0 50%;
    }

    .gravity-desc {
      display: block;
      text-align: center;
      padding: 5px 0;
      border-top: 1px solid ${shadows};
      border-bottom: 1px solid ${shadows};
      font-size: 10px;
      font-family: ${primaryFont};
      text-transform: uppercase;
      font-weight: bold;
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

    @media ${screenMedium} {
      .avatar-line {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 50%;
        height: 100%;
        border-right: 1px solid ${shadows};
      }

      .title {
        padding: 25px;
        text-align: center;
        width: 100%;
      }

      .observer-avatar {
        margin: 25px auto;
        position: relative;
        z-index: 1;
      }

      .observer-info-container {
        flex-direction: column;
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
