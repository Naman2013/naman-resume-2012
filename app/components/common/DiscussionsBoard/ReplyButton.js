/***********************************
* V4  Discussions Reply Form
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import Button from 'app/components/common/style/buttons/Button';
import RevealSubmitForm from 'app/components/common/RevealSubmitForm';
import { romance, astronaut, shadows } from 'app/styles/variables/colors_tiles_v4';
import { dropShadowContainer } from 'app/styles/mixins/utilities';
import messages from './ReplyForm.messages';

const {
  arrayOf,
  any,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;


class ReplyButton extends Component {
  static defaultProps = {
    avatarURL: '',
    replyTo: null,
    callSource: null,
    user: {
      at: null,
      cid: null,
      token: null,
    },
    forumId: null,
  }
  static propTypes = {
    avatarURL: string,
    submitReply: func.isRequired,
    callSource: string,
    threadId: oneOfType([number, string]).isRequired,
    topicId: oneOfType([number, string]).isRequired,
    forumId: oneOfType([number, string]),
    replyTo: oneOfType([number, string]),
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }),
    intl: intlShape.isRequired,
  }


  submitForm = (content, S3URLs, callback) => {
    const {
      callSource,
      replyTo,
      submitReply,
      threadId,
      forumId,
      topicId,
      user,
    } = this.props;

    submitReply({
      content,
      S3URLs,
      threadId,
      topicId,
      forumId,
      replyTo,
      at: user.at,
      token: user.token,
      cid: user.cid,
      callSource,
    }, (data) => this.handleSubmitReply(data, callback));
  }

  handleSubmitReply = (data, callback) => {
    const { intl } = this.props;
    const message = data.apiError ? intl.formatMessage(messages.CommentErrorText) : intl.formatMessage(messages.CommentSuccessText);
    callback(data.apiError, message);
  }

  render() {
    const {
      avatarURL,
      isDesktop,
      user,
      intl,
    } = this.props;
    return (
      <div className="reply-form-container">
        <RevealSubmitForm
          {...this.props}
          submitForm={this.submitForm}
          placeholder={intl.formatMessage(messages.PublicCommentPlaceholder)}
          revealButtonRender={btnProps => <Button text={intl.formatMessage(messages.Reply)} onClickEvent={btnProps.displayForm} />}
        />
      </div>
    );
  }
}

export default injectIntl(ReplyButton);
