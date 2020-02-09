/***********************************
 * V4 Like Button
 *
 *
 *
 ***********************************/

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { likeReply } from 'app/services/discussions/like';
import LikeButton from 'app/components/common/style/buttons/LikeButton';
import { customModalStylesBlackOverlay } from 'app/styles/mixins/utilities';
import { Tooltip } from 'react-tippy';

import styles from './LikeSomethingButton.style';

const { func, bool, number, oneOfType, shape, string } = PropTypes;

class LikeHeartButton extends Component {
  static propTypes = {
    customerId: oneOfType([number, string]).isRequired,
    likeHandler: func,
    mod: string,
    showLikePrompt: bool,
    alwaysShowCount: bool,
    likePrompt: string.isRequired,
    likesCount: number.isRequired,    
    // only pass openModal if you want to use a higher component modal
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
    openModal: null,
    alwaysShowCount: false,
    showLikePrompt: true,
    mod: '',
   
    
  };

  state = {
    isModalOpen: false,
    likesCount: this.props.likesCount,
    likePrompt: this.props.likePrompt,
    
  };

  componentWillReceiveProps(nextProps) {      
    if (this.props.likePrompt !== nextProps.likePrompt) {                 
        this.setState({
          likePrompt: nextProps.likePrompt,          
        });
        if (nextProps!=undefined && nextProps.likePrompt == "You have reached your like limit. Try again later.") {
      this.setState({
        isModalOpen:true,
      });
    }
    }

    

    if (this.props.likesCount !== nextProps.likesCount) {
      this.setState({
        likesCount: nextProps.likesCount,
      });
    }
  }

  likeItem = e => {    
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
      }).then(res => {        
        if (res && res.data)        
          return this.handleLikeResult(res);
        else
          return this.handleLikeResult({data: res});
      });
    }
  };

  handleLikeResult = res => {
    const { likeResultHandler } = this.props;
    const {
      apiError,
      showLikePrompt,
      likesCount,
      count,
      likePrompt,
      likedByMe,
      likeTooltip,
    } = res.data;
    const resultLikesCount = count != null ? count : likesCount;    
    if (!apiError) {
      this.setState(() => ({
        likesCount: Number(resultLikesCount),
        likedByMe,
        likeTooltip,
      }));
      
      if (typeof likeResultHandler === 'function') {
        likeResultHandler(resultLikesCount);
      }
    }

    if (showLikePrompt) {
      this.setState(() => ({
        likePrompt,
      }));
      this.setModal();
    }
  };

  setModal = () => {
    if (this.props.openModal) {
      this.props.openModal(this.state.likePrompt);
    } else {
      // if no open modal function is passed, use component's modal
      this.setState({
        isModalOpen: true,
      });
    }
  };

  closeModal = e => {
    e.preventDefault();
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const {
      likePrompt,
      likesCount,
      isModalOpen,
      likedByMe: likedByMeInner,
      likeTooltip: likeTooltipInner,
    } = this.state;
    const { mod, user, likedByMe, likeTooltip } = this.props;
    if (!user) return null;
    const tooltip = likeTooltipInner || likeTooltip;
    return (
      <Fragment>
        <Tooltip
          disabled={!tooltip}
          html={<div dangerouslySetInnerHTML={{ __html: tooltip }} />}
          theme="light"
          unmountHTMLWhenHide
          animateFill={false}
        >
          <LikeButton
            mod={mod}
            onClickEvent={this.likeItem}
            count={likesCount}
            alwaysShowCount
            likedByMe={likedByMe || likedByMeInner}
          />
        </Tooltip>
        <Modal
          ariaHideApp={false}
          isOpen={isModalOpen}
          style={customModalStylesBlackOverlay}
          contentLabel="Like"
          onRequestClose={this.closeModal}
        >
          <i className="fa fa-close" onClick={this.closeModal} />
          <p className="" dangerouslySetInnerHTML={{ __html: likePrompt }} />
        </Modal>
        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(LikeHeartButton);
