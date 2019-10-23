/***********************************
 * V4 Related Shows
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Link, browserHistory } from 'react-router';
import classnames from 'classnames';
import Modal from 'react-modal';
import uniqueId from 'lodash/uniqueId';
import {
  profilePhotoStyle,
  customModalStylesBlackOverlay,
} from 'app/styles/mixins/utilities';
import fetchObjectFollowService from 'app/services/objects/object-follow';
import Button from 'app/components/common/style/buttons/Button';

import { blue_tile_feat } from '../../styles/variables/colors_tiles_v4';

import styles from './RelatedObject.style';

const { arrayOf, bool, number, shape, string } = PropTypes;

const profPic = photoUrl =>
  Object.assign(profilePhotoStyle(photoUrl), {
    height: '105px',
    width: '105px',
    backgroundRepeat: 'no-repeat',
    background: `url(${photoUrl}) center center no-repeat, url(${blue_tile_feat})`,
  });
@withTranslation()
class RelatedObject extends Component {
  static propTypes = {
    isDesktop: bool,
    label: string,
    objectIconUrl: string,
    objectTitle: string,
    objectId: number,
    followPrompt: string,
    showFollowPromptFlag: bool,
    hasLink: bool,
    linkUrl: string,
    LinkLabel: string,
    dataBlocks: shape({
      listCount: number,
      list: shape({
        constellation: shape({
          text: string,
          iconURL: string,
        }),
        domain: shape({
          text: string,
          iconURL: string,
        }),
        type: shape({
          text: string,
          iconURL: string,
        }),
      }),
    }),
    user: shape({
      at: string,
      cid: string,
      token: string,
    }).isRequired,

  };

  static defaultProps = {
    isDesktop: false,
    label: '',
    objectIconUrl: '',
    objectTitle: '',
    hasLink: false,
    linkUrl: '',
    LinkLabel: '',
    objectId: null,
    followPrompt: '',
    showFollowPromptFlag: false,
    hasLink: true,
    dataBlocks: {
      listCount: 0,
      list: {
        constellation: {
          text: '',
          iconURL: '',
        },
        domain: {
          text: '',
          iconURL: '',
        },
        type: {
          text: '',
          iconURL: '',
        },
      },
    },
  };

  state = {
    showInfo: !this.props.isDesktop,
    promptText: this.props.followPrompt,
    modalIsOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.followPrompt !== nextProps.followPrompt) {
      this.setState({
        promptText: nextProps.followPrompt,
      });
    }
  }

  onToggleFollow = () => {
    const { objectId, user } = this.props;
    const { at, cid, token } = user;
    fetchObjectFollowService({
      at,
      cid,
      token,
      objectId,
    }).then(res => {
      if (!res.data.apiError) {
        this.setState({
          promptText: res.data.followPrompt,
        });
      }
    });
  };

  openModal = () => {
    this.setState({
      modalIsOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  };

  navigateToObject = () => {
    const { linkUrl } = this.props;
    browserHistory.push(linkUrl);
  };

  render() {
    const {
      isDesktop,
      fetching,
      relatedObjectsCount,
      label,
      objectIconUrl,
      v4IconURL,
      linkUrl,
      objectTitle,
      objectDescription,
      dataBlocks,
      showFollowPromptFlag,
      t,
    } = this.props;

    const { promptText, modalIsOpen } = this.state;
    const hide = relatedObjectsCount === 0;

    const { list } = dataBlocks;
    return (
      <div className={classnames('root', { 'display-none': fetching || hide })}>
        <div
          className="title-container"
          dangerouslySetInnerHTML={{ __html: label }}
        />
        <div className="info-container">
          <span
            className="object-name"
            dangerouslySetInnerHTML={{ __html: objectTitle }}
          />
          <span className="icon-line-horz" />
          <div className="icon-container flex-item">
            <div className="icon" style={profPic(v4IconURL || objectIconUrl)} />
          </div>
          <span className="icon-line-horz" />
          <div className="info-list">
            <div className="info-list-item">
              <img className="info-list-icon" src={list.type.iconURL} />
              <span dangerouslySetInnerHTML={{ __html: list.type.text }} />
            </div>
            <div className="info-list-item">
              <img className="info-list-icon" src={list.domain.iconURL} />
              <span dangerouslySetInnerHTML={{ __html: list.domain.text }} />
            </div>
            <div className="info-list-item">
              <img
                className="info-list-icon"
                src={list.constellation.iconURL}
              />
              <span
                dangerouslySetInnerHTML={{ __html: list.constellation.text }}
              />
            </div>
          </div>
        </div>
        <div className="action-area">
          {showFollowPromptFlag ? (
            <Button
              onClickEvent={this.onToggleFollow}
              text={promptText}
              className="action-area-button"
              theme={{ marginRight: '10px' }}
            />
          ) : null}
          <Button
            className="action-area-button"
            onClickEvent={this.openModal}
            icon="https://vega.slooh.com/assets/v4/common/info_icon.svg"
            theme={{ marginRight: '10px' }}
          />
          <Button
            icon="https://vega.slooh.com/assets/v4/common/arrow_horz.svg"
            onClickEvent={this.navigateToObject}
          />
        </div>
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          style={customModalStylesBlackOverlay}
          contentLabel={t('Objects.RelatedObjects')}
          onRequestClose={this.closeModal}
        >
          <i className="fa fa-close" onClick={this.closeModal} />
          <p
            className=""
            dangerouslySetInnerHTML={{ __html: objectDescription }}
          />
        </Modal>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default RelatedObject;
