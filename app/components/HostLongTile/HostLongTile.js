/***********************************
 * V4 HostLongTile
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Modal from 'react-modal';
import { profilePhotoStyle } from 'app/styles/mixins/utilities';
import Button from 'app/components/common/style/buttons/Button';
import { customModalStylesV4 } from 'app/styles/mixins/utilities';
import styles from './HostLongTile.style';
import { setPublicCardStatusAction } from '../../modules/upcoming-events/upcoming-events-actions';
import { compose } from 'redux';
import { connect } from 'react-redux';

const { arrayOf, bool, number, shape, string } = PropTypes;

const profPic = photoUrl =>
  Object.assign(profilePhotoStyle(photoUrl), {
    height: '105px',
    width: '105px',
    backgroundSize: 'cover',
  });

class HostLongTile extends Component {
  static propTypes = {
    isDesktop: bool,
    title: string,
    hostDesc: string.isRequired,
    hostName: string.isRequired,
    hostPhotoURL: string.isRequired,
    hostTitle: string.isRequired,
    hostURL: string.isRequired,
    orgName: string,
    orgURL: string,
    user: shape({
      at: string,
      cid: string,
      token: string,
    }).isRequired,
  };

  static defaultProps = {
    title: 'Host',
    isDesktop: false,
    orgName: '',
    orgURL: '',
  };

  state = {};

  render() {
    const {
      title,
      isDesktop,
      hostDesc,
      hostName,
      hostURL,
      hostPhotoURL,
      hostTitle,
      hostGravity,
      hostUUID,
      setPublicCardStatusAction
    } = this.props;

    return (
      <div className="root">
        <div className="left">
          <div className="title-container">{title}</div>
          {/* <Link to={hostURL}> */}
            <span onClick={()=>setPublicCardStatusAction(hostUUID, true)}
              className="host-name"
              dangerouslySetInnerHTML={{ __html: hostName }}
            />
            <span className="icon-line-horz" />
            <div className="member-info">
              <span
                className="gravity-label"
                dangerouslySetInnerHTML={{ __html: hostTitle }}
              />
              <div className="gravity-container">
                <img
                  className="star"
                  src="https://vega.slooh.com/assets/v4/common/star_icon.svg"
                />
                <span
                  className="gravity-text"
                  dangerouslySetInnerHTML={{ __html: hostGravity }}
                />
              </div>
            </div>
          {/* </Link> */}
        </div>
        <div>
          {/* <Link to={hostURL}> */}
            <div className="icon-container-circle" onClick={()=>setPublicCardStatusAction(hostUUID, true)}>
              <div className="circle-icon-line">
                <div className="icon" style={profPic(hostPhotoURL)} />
              </div>
            </div>
          {/* </Link> */}
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setPublicCardStatusAction
}

export default compose(connect(null,mapDispatchToProps)) (HostLongTile);
