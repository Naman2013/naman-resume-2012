/***********************************
 * V4  Discussions Reply Form
 *
 *
 *
 ***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import { intlShape, injectIntl } from 'react-intl';
import Button from 'app/components/common/style/buttons/Button';
import RevealSubmitForm from 'app/components/common/RevealSubmitForm';
import {
  romance,
  astronaut,
  shadows,
} from 'app/styles/variables/colors_tiles_v4';
import { dropShadowContainer } from 'app/styles/mixins/utilities';
import { prepareReply } from 'app/services/discussions/prepare-reply';
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
@withTranslation
class ReplyButton extends Component {
  state = {
    uuid: null,
  };

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
  };

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
  };

  preparePostUID() {
    const { user } = this.props;

    return prepareReply({
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then(res => {
      this.setState(() => ({
        uuid: res.data.postUUID,
      }));
    });
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

    submitReply(
      {
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
      },
      data => this.handleSubmitReply(data, callback)
    );
  };

  handleSubmitReply = (data, callback) => {
    const { t } = this.props;
    const message = data.apiError
      ? t('.CommentErrorText')
      : t('.CommentSuccessText');
    callback(data.apiError, message);
  };

  render() {
    const { avatarURL, isDesktop, user, t } = this.props;
    const { uuid } = this.state;
    return (
      <div className="reply-form-container">
        <RevealSubmitForm
          {...this.props}
          uuid={uuid}
          submitForm={this.submitForm}
          placeholder={t('.PublicCommentPlaceholder')}
          revealButtonRender={btnProps => (
            <Button
              text={t('.Reply')}
              onClickEvent={e => {
                this.preparePostUID().then(() => {
                  btnProps.displayForm(e);
                });
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default injectIntl(ReplyButton);
