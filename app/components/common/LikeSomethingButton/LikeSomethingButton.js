/***********************************
* V4 Like Button
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import noop from 'lodash/noop';
import { likeReply } from 'services/discussions/like';
import LikeButton from 'components/common/style/buttons/LikeButton';
import { customModalStylesV4 } from 'styles/mixins/utilities';

const {
  func,
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class LikeHeartButton extends Component {
  static propTypes = {
    customerId: oneOfType([number, string]).isRequired,
    likeHandler: func,
    likeParams: shape({}),
    showLikePrompt: bool,
    alwaysShowCount: bool,
    likePrompt: string.isRequired,
    likesCount: number.isRequired,
    openModal: func,
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
    likeParams: shape({
      authorId: oneOfType([number, string]), // required for all

      likeType: string, // required for post/story
      likeId: oneOfType([number, string]), // required for post/story
      objectSlug: string, // required for post/story
      type: string, // required for post/story
      membershipType: string, //required for post/story

      callSource: oneOfType([number, string]), //	optional for threads but required for qanda
      objectId: oneOfType([number, string]), //	optional for threads but required for qanda
      threadId: oneOfType([number, string]), // required for thread
      forumId: oneOfType([number, string]), // required for thread
      topicId: oneOfType([number, string]), // required for thread
      // STORIES/COMMUNITY-CONTENT: https://docs.google.com/document/d/1f_j2BVr0DPddREt9BbdWomp2UWOUYB7-IQqNR6ny3bc/edit#heading=h.468bhs5xy24i
      // THREADS https://docs.google.com/document/d/1f_j2BVr0DPddREt9BbdWomp2UWOUYB7-IQqNR6ny3bc/edit#heading=h.aefbaw7ffr19
    }),
  };

  static defaultProps = {
    likeHandler: likeReply,
    likeParams: {},
    openModal: noop,
    alwaysShowCount: false,
    showLikePrompt: true,
  }

  state = {
    isModalOpen: false,
    likesCount: this.props.likesCount,
    likePrompt: this.props.likePrompt,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.likePrompt !== nextProps.likePrompt) {
      this.setState({
        likePrompt: nextProps.likePrompt,
      });
    }

    if (this.props.likesCount !== nextProps.likesCount) {
      this.setState({
        likesCount: nextProps.likesCount,
      });
    }
  }

  likeItem = (e) => {
    e.preventDefault();
    const {
      likeHandler,
      customerId,
      likeParams,
      showLikePrompt,
      user,
    } = this.props;

    if (showLikePrompt) {
      this.setModal();
    } else {
      likeHandler({
        ...likeParams,
        authorId: customerId,
        token: user.token,
        at: user.at,
        cid: user.cid,
      }).then(this.handleLikeResult);
    }
  }

  handleLikeResult = (res) => {
    const {
      apiError,
      showLikePrompt,
      count,
      likePrompt,
    } = res.data;
    if (!apiError) {
      this.setState({
        likesCount: count,
      });
    }

    if (showLikePrompt) {
      this.setState({
        likePrompt,
      });
      this.setModal();
    }
  }

  setModal = () => {
    if (this.props.openModal) {
      this.props.openModal(this.state.likePrompt);
    }
    // if no open modal function is passed, use component's modal
    this.setState({
      isModalOpen: true,
    });
  }

  closeModal = (e) => {
    e.preventDefault();
    this.setState({
      isModalOpen: false,
    });
  }

  render() {
    const {
      likePrompt,
      likesCount,
      isModalOpen,
    } = this.state;
    return (<div>
      <LikeButton onClickEvent={this.likeItem} count={likesCount} alwaysShowCount />
      <Modal
        ariaHideApp={false}
        isOpen={isModalOpen}
        style={customModalStylesV4}
        contentLabel="Like"
        onRequestClose={this.closeModal}
      >
        <i className="fa fa-close" onClick={this.closeModal} />
        <p className="" dangerouslySetInnerHTML={{ __html: likePrompt }} />
      </Modal>
      <style jsx>{`
        .fa-close {
          position: absolute;
          top: 5px;
          right: 10px;
        }
      `}</style>
    </div>);
  }
}

export default LikeHeartButton;
