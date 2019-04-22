/***********************************
* V4  Discussions Reply Form
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import FormHeader from 'app/components/common/FormHeader';
import SingleFieldSubmitForm from 'app/components/common/SingleFieldSubmitForm';
import RevealSubmitForm from 'app/components/common/RevealSubmitForm';
import { prepareReply } from 'app/services/discussions/prepare-reply';
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


class ReplyForm extends Component {
  static defaultProps = {
    avatarURL: '',
    placeholder: 'Reply to this comment',
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

  constructor(props) {
    super();
    const { user } = props;
    this.state = {
      uuid: '',
    }

    prepareReply({
      at: user.at,
      token: user.token,
      cid: user.cid
    }).then((res) => {
      this.setState(() => ({
        uuid: res.data.postUUID,
      }));
    })
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
      placeholder,
    } = this.props;

    return (
      <div className="reply-form-container">
        <RevealSubmitForm
          {...this.props}
          submitForm={this.submitForm}
          placeholder={placeholder}
          uuid={this.state.uuid}
        />

      <style jsx>{`
        .reply-form-container {
          background-color: ${romance};
        }
      `}</style>
      </div>
    );
  }
}

export default injectIntl(ReplyForm);
