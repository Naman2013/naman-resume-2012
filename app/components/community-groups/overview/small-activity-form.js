/** *********************************
 * V4 Community Group Activity Form
 *
 *
 *
 ********************************** */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';

import RevealSubmitForm from 'components/common/RevealSubmitForm';
import messages from './activity-form.messages';

const { bool, number, string } = PropTypes;

class SmallActivityForm extends Component {
  static propTypes = {
    topicId: number,
    forumId: number,
    canPost: bool,
    placeholder: string,
    uuid: string,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    topicId: 0,
    forumId: 0,
    placeholder: '',
    canPost: false,
    uuid: null,
  };

  state = {};

  submitForm = (content, S3URLs, callback) => {
    const { topicId, forumId, intl } = this.props;

    this.props
      .createThread({
        S3URLs,
        content,
        topicId,
        forumId,
      })
      .then((data) => {
        const message = data.apiError
          ? intl.formatMessage(messages.SubmitPostError)
          : intl.formatMessage(messages.PostSubmitted);
        callback(data.apiError, message);
      });
  };

  render() {
    const { placeholder, intl } = this.props;
    const formPlaceholder = placeholder || `${intl.formatMessage(messages.WriteSomething)}...`;

    return (
      <div className="root">
        <RevealSubmitForm
          {...this.props}
          submitForm={this.submitForm}
          placeholder={formPlaceholder}
        />
      </div>
    );
  }
}

export default injectIntl(SmallActivityForm);
