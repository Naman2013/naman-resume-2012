/***********************************
* V4 Related Shows
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import Modal from 'react-modal';
import uniqueId from 'lodash/uniqueId';
import { intlShape, injectIntl } from 'react-intl';
import { profilePhotoStyle } from 'styles/mixins/utilities';
import fetchObjectFollowService from 'services/objects/object-follow';
import Button from 'components/common/style/buttons/Button';
import { customModalStylesBlackOverlay } from 'styles/mixins/utilities';
import styles from './RelatedObject.style';
import messages from './RelatedObject.messages';

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
    linkURL: string,
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
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    isDesktop: false,
    label: '',
    objectIconUrl: '',
    objectTitle: '',
    hasLink: false,
    linkURL: '',
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
    })
  }

  openModal = () => {
    this.setState({
      modalIsOpen: true,
    });
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  }


  render() {
    const {
      isDesktop,
      fetching,
      relatedObjectsCount,
      label,
      objectIconUrl,
      linkURL,
      objectTitle,
      objectDescription,
      dataBlocks,
      showFollowPromptFlag,
      intl,
    } = this.props;

    const { promptText, modalIsOpen } = this.state;
    const hide = relatedObjectsCount === 0;

    const { list } = dataBlocks;
    return (<div className={classnames('root', { 'display-none': fetching || hide })}>
      <div className="title-container" dangerouslySetInnerHTML={{ __html: label }} />
      <Link to={linkURL}>
        <div className="info-container">
          <span className="object-name" dangerouslySetInnerHTML={{ __html: objectTitle }} />
          <span className="icon-line-horz" />
          <div className="icon-container flex-item">
            <div className="icon" style={profPic(objectIconUrl)} />
          </div>
          <span className="icon-line-horz" />
          <div className="info-list">
            <div className="info-list-item">
              <img className="info-list-icon" src= {list.type.iconURL} />
              <span dangerouslySetInnerHTML={{ __html: list.type.text }} />
            </div>
            <div className="info-list-item">
              <img className="info-list-icon" src= {list.domain.iconURL} />
              <span dangerouslySetInnerHTML={{ __html: list.domain.text }} />
            </div>
            <div className="info-list-item">
              <img className="info-list-icon" src= {list.constellation.iconURL} />
              <span dangerouslySetInnerHTML={{ __html: list.constellation.text }} />
            </div>
          </div>
        </div>
      </Link>
      <div className="action-area">
        {showFollowPromptFlag ? <Button onClickEvent={this.onToggleFollow} text={promptText} /> : null}
        <Button onClickEvent={this.openModal} icon="https://vega.slooh.com/assets/v4/common/info_icon.svg" />
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        style={customModalStylesBlackOverlay}
        contentLabel={intl.formatMessage(messages.RelatedObjects)}
        onRequestClose={this.closeModal}
      >
        <i className="fa fa-close" onClick={this.closeModal} />
        <p className="" dangerouslySetInnerHTML={{ __html: objectDescription }} />
      </Modal>
      <style jsx>{styles}</style>
    </div>);
  }
}

export default injectIntl(RelatedObject);
