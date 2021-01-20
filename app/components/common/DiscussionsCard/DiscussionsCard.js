/***********************************
 * V4 Discussions Thread List Item
 *
 *
 *
 ***********************************/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router';
import uniqueId from 'lodash/uniqueId';
import moment from 'moment';
import CommentButton from 'app/components/common/style/buttons/CommentButton';
import LikeSomethingButton from 'app/components/common/LikeSomethingButton';
import ReplyButton from 'app/components/common/DiscussionsBoard/ReplyButton';
import Button from 'app/components/common/style/buttons/Button';
import ViewImagesButton from 'app/components/common/style/buttons/ViewImagesButton';
import FlagButton from 'app/components/common/FlagButton';
import ViewImage from 'app/modules/multi-upload-images/components/view-image';
import styles, { profPic } from './DiscussionsCard.style';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

@withTranslation()
class DiscussionsCard extends PureComponent {
  componentDidMount() {
    const { jumpToThreadId, threadId } = this.props;
    if (jumpToThreadId == threadId) {
      let cardOffSet = document.getElementById(`card-${threadId}`);
      let cardOffsetValue = cardOffSet.offsetTop;
      
      document.documentElement.scrollTop = cardOffsetValue;
      //setTimeout(() => this.discussionTile.scrollIntoView(), 1000);
    }
  }
 
  render() {
    const {
      avatarURL,
      allowReplies,
      creationDate,
      modified,
      content,
      customerId,
      displayName,
      isDesktop,
      likeHandler,
      likeParams,
      likePrompt,
      likesCount,
      likedByMe,
      likeTooltip,
      openModal,
      renderChildReplies,
      replyToponlyCount,
      replyTo,
      S3Files,
      toggleComments,
      showComments,
      showLikePrompt,
      submitReply,
      title,
      threadId,
      user,
      showTitle,
      flagParams,
      authorInfo,
      t,
      setPublicCardStatusAction
    } = this.props;
   
    return (
      <div
        className="root"
        id={`card-${threadId}`}
        ref={node => (this.discussionTile = node)}
      >
        <div className="comment-item">
          <div className="user-info-container">
            <div className="user-info">
              <div style={profPic(avatarURL)} />
              <Link onClick={()=>setPublicCardStatusAction(authorInfo.customerUUID, true)} >
                <div
                  className="display-name"
                  dangerouslySetInnerHTML={{ __html: displayName }}
                />
              </Link>
            </div>
            <span className="date">{moment.utc(modified).fromNow()}</span>
          </div>
          <br />
          {showTitle == true && (
            <div
              className="title"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {!!S3Files.length && <ViewImage images={S3Files} />}
          <div className="explainantion-container">
            <div className="explainantion-item">
              {moment.utc(modified).fromNow()}
            </div>
            <div className="explainantion-item">
              {t('AskAnAstronomer.Likes')}: {likesCount}{' '}
            </div>
            <div className="explainantion-item">
              {t('AskAnAstronomer.Comments')}: {replyToponlyCount}
            </div>
          </div>
          <div className="activity-actions">
            <div className="action-left">
              <LikeSomethingButton
                likeHandler={likeHandler}
                likesCount={likesCount}
                likedByMe={likedByMe}
                likeTooltip={likeTooltip}
                likePrompt={likePrompt}
                likeParams={likeParams}
                openModal={openModal}
                showLikePrompt={showLikePrompt}
                customerId={customerId}
              />
              {renderChildReplies ? (
                <CommentButton
                  isActive={showComments}
                  onClickEvent={toggleComments}
                  count={replyToponlyCount}
                  alwaysShowCount
                />
              ) : null}
              {/*{S3Files.length > 0 ? (*/}
              {/*<ViewImagesButton images={S3Files} />*/}
              {/*) : null}*/}
            </div>
            <div className="action-right">
              {allowReplies ? (
                <ReplyButton
                  {...this.props}
                  replyTo={replyTo}
                  submitForm={submitReply}
                />
              ) : null}
               {allowReplies ? (
              <FlagButton flagParams={flagParams} />
               ) : null }
            </div>
          </div>
        </div>
        {showComments && renderChildReplies
          ? renderChildReplies({
              renderToggle: () => (
                <Button
                  icon="https://vega.slooh.com/assets/v4/common/close_icon.svg"
                  onClickEvent={toggleComments}
                />
              ),
            })
          : null}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

// DiscussionsCard.propTypes = {
//   avatarURL: string.isRequired,
//   allowReplies: bool,
//   customerId: oneOfType([number, string]).isRequired,
//   displayName: string.isRequired,
//   openModal: func,
//   freshness: string,
//   likeHandler: func,
//   likeParams: shape({}),
//   isDesktop: bool.isRequired,
//   user: shape({
//     at: oneOfType([number, string]),
//     token: oneOfType([number, string]),
//     cid: oneOfType([number, string]),
//   }).isRequired,
//   likePrompt: string.isRequired,
//   likesCount: number.isRequired,
//   replyToponlyCount: number.isRequired,
//   S3Files: arrayOf(string),
//   submitReply: func,
//   showLikePrompt: bool.isRequired,
//   renderChildReplies: func,
// };

// DiscussionsCard.defaultProps = {
//   allowReplies: true,
//   likeHandler: null,
//   likeParams: {},
//   openModal: null,
//   S3Files: [],
//   renderChildReplies: null,
//   submitReply: null,
// };

export default DiscussionsCard;
