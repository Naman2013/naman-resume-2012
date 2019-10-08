/** *********************************
 * V4 Community Group Activity Form
 *
 *
 *
 ********************************** */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { intlShape, injectIntl } from 'react-intl';

import RevealSubmitForm from 'app/components/common/RevealSubmitForm';
import messages from './activity-form.messages';

const { bool, number, string } = PropTypes;
@withTranslation
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

  submitForm = (content, S3URLs, title, callback) => {
    const { topicId, forumId, t } = this.props;

    this.props
      .createThread({
        S3URLs,
        content,
        title,
        topicId,
        forumId,
      })
      .then(data => {
        const message = data.apiError
          ? t('.SubmitPostError')
          : t('.PostSubmitted');
        callback(data.apiError, message);
      });
  };

  render() {
    const { placeholder, t, isClub } = this.props;
    const formPlaceholder = placeholder || `${t('.WriteSomething')}...`;

    return (
      <div className="root">
        <RevealSubmitForm
          {...this.props}
          submitForm={this.submitForm}
          placeholder={formPlaceholder}
          commentPlaceholder={isClub && 'Start a discussion'}
        />
      </div>
    );
  }
}

export default injectIntl(SmallActivityForm);
