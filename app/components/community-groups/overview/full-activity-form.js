/** *********************************
 * V4 Community Group Activity Form
 *
 *
 *
 ********************************** */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import FormHeader from 'app/components/common/FormHeader';
import SingleFieldSubmitForm from 'app/components/common/SingleFieldSubmitForm';

const { bool, number, string } = PropTypes;
@withTranslation()
class FullActivityForm extends Component {
  static propTypes = {
    topicId: number,
    forumId: number,
    canPost: bool,
    placeholder: string,
    uuid: string,
  };

  static defaultProps = {
    topicId: 0,
    forumId: 0,
    canPost: false,
    placeholder: '',
    uuid: null,
  };

  state = {
    isLoading: false,
  };

  submitForm = (content, S3URLs, title, callback) => {
    const { topicId, forumId, t } = this.props;

    this.setState(state => ({
      isLoading: !state.isLoading,
    }));

    this.props
      .createThread({
        S3URLs,
        content,
        title,
        topicId,
        forumId,
      })
      .then(data => {
        this.setState(state => ({
          isLoading: !state.isLoading,
        }));

        const message = data.apiError
          ? t('Clubs.SubmitPostError')
          : t('Clubs.PostSubmitted');
        callback(data.apiError, message);
      });
  };

  render() {
    const { user, t, placeholder, toggleInfo, showInfo } = this.props;
    const { isLoading } = this.state;

    const formPlaceholder = placeholder || `${t('Clubs.WriteSomething')}...`;

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
              isLoading={isLoading}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default FullActivityForm;
