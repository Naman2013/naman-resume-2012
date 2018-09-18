/***********************************
 * V4 Mission Snap Details
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { profilePhotoStyle } from 'styles/mixins/utilities';
import BlueLineDrop from 'components/common/BlueLineDrop';
import { astronaut, geyser, shadows, romance } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';
import styles from './MissionSnapDetails.style';

const { arrayOf, bool, shape, string } = PropTypes;


const BootstrappedMissionSnapDetails = ({
  listTitle,
  isDesktop,
  missionDetailList,
  isScreenLarge,
}) => (
  <div>
    <BlueLineDrop
      title={listTitle}
      isDesktop={isDesktop}
      theme={{ margin: isScreenLarge ? '25px 0' : '25px' }}
      render={() => (
        <div>
        </div>
      )}
    />
    <style jsx>{styles}</style>
  </div>
);

BootstrappedMissionSnapDetails.propTypes = {
  isDesktop: bool,
  listTitle: string,
  missionDetailList: shape({
    missiondate: shape({
      hasIconFlag: bool,
      hasLinkFlag: bool,
      iconUrl: string,
      label: string,
      linkLabel: string,
      linkUrl: string,
      text: string,
      textDetail: string,
      textNote: string
    }),
    observatory: shape({
      hasIconFlag: bool,
      hasLinkFlag: bool,
      iconUrl: string,
      label: string,
      linkLabel: string,
      linkUrl: string,
      text: string,
      textDetail: string,
      textNote: string
    }),
    scheduledby: shape({
      hasIconFlag: bool,
      hasLinkFlag: bool,
      iconUrl: string,
      label: string,
      linkLabel: string,
      linkUrl: string,
      text: string,
      textDetail: string,
      textNote: string
    }),
    telescope: shape({
      hasIconFlag: bool,
      hasLinkFlag: bool,
      iconUrl: string,
      label: string,
      linkLabel: string,
      linkUrl: string,
      text: string,
      textDetail: string,
      textNote: string
    })
  })
};

BootstrappedMissionSnapDetails.defaultProps = {
  isDesktop: false,
  listTitle: "",
  missionDetailList: {
    scheduledby: {},
    observatory: {},
    missiondate: {},
    telescope: {}
  }
};

export default BootstrappedMissionSnapDetails;
