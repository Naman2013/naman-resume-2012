/** *********************************
 * V4 Community Group Activity Form
 *
 *
 *
 ********************************** */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import FormHeader from 'app/components/common/FormHeader';
import SingleFieldSubmitForm from 'app/components/common/SingleFieldSubmitForm';
import messages from './activity-form.messages';

const { bool, number, string } = PropTypes;
@withTranslation
class FullActivityForm extends Component {
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
    canPost: false,
    placeholder: '',
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
    const { user, t, placeholder, toggleInfo, showInfo } = this.props;

    const formPlaceholder = placeholder || `${t('.WriteSomething')}...`;

    return (
      <div className="form-container">
        <div>
          <FormHeader
            avatarURL={user.avatarURL}
            toggleInfo={toggleInfo}
            showInfo={showInfo}
          />

          {showInfo ? (
            <SingleFieldSubmitForm
              {...this.props}
              submitForm={this.submitForm}
              placeholder={formPlaceholder}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default injectIntl(FullActivityForm);
