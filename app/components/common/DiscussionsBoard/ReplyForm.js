/***********************************
* V4  Discussions Reply Form
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormHeader from 'components/common/FormHeader';
import SingleFieldSubmitForm from 'components/common/SingleFieldSubmitForm';
import RevealSubmitForm from 'components/common/RevealSubmitForm';
import { prepareReply } from 'services/discussions/prepare-reply';
import { romance, astronaut, shadows } from 'styles/variables/colors_tiles_v4';
import { dropShadowContainer } from 'styles/mixins/utilities';

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
    const message = data.apiError ? 'There was an error submitting your comment.' : 'Your comment has been submitted';
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

export default ReplyForm;
