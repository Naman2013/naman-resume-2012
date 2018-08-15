/***********************************
* V4 Hosts
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Modal from 'react-modal';
import { profilePhotoStyle } from 'styles/mixins/utilities';
import Button from 'components/common/style/buttons/Button';
import { customModalStylesV4 } from 'styles/mixins/utilities';
import styles from './Host.style';

const {
  arrayOf,
  bool,
  number,
  shape,
  string,
} = PropTypes;

const profPic = photoUrl => Object.assign(profilePhotoStyle(photoUrl), {
  height: '105px',
  width: '105px',
  backgroundSize: 'cover',
});

class Hosts extends Component {
  static propTypes = {
    isDesktop: bool,
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
  }

  static defaultProps = {
    isDesktop: false,
    orgName: '',
    orgURL: '',
  };

  state = {
  };

  render() {
    const {
      isDesktop,
      hostDesc,
      hostName,
      hostURL,
      hostPhotoURL,
      hostTitle,
      hostGravity,
    } = this.props;


    return (<div className="root">
      <div className="title-container">Host</div>
      <Link to={hostURL}>
        <div className="info-container">
          <span className="host-name" dangerouslySetInnerHTML={{ __html: hostName }} />
          <span className="icon-line-horz" />
          <div className="icon-container flex-item">
            <div className="icon" style={profPic(hostPhotoURL)} />
          </div>
          <span className="icon-line-horz" />
          <div className="member-info">
            <span className="gravity-label" dangerouslySetInnerHTML={{ __html: hostTitle }} />
            <div className="gravity-container">
              <img className= "star" src="https://vega.slooh.com/assets/v4/common/star_icon.svg" />
              <span className="gravity-text" dangerouslySetInnerHTML={{ __html: hostGravity }} />
            </div>
          </div>
        </div>
      </Link>
      <style jsx>{styles}</style>
    </div>);
  }
}

export default Hosts;
