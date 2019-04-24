/** *********************************
 * V4 Request Group Form
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import Button from 'app/components/common/style/buttons/Button';
import styles from './request-group-form.style';
import messages from './request-group-from.messages';

const { func } = PropTypes;

class RequestGroupForm extends Component {
  static propTypes = {
    closeForm: func.isRequired,
    submitForm: func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {};

  state = {
    requestFormText: '',
    requestFormPrivacy: 'public',
  };

  onChangeRequestForm = (e) => {
    e.preventDefault();
    this.setState({
      requestFormText: e.target.value,
    });
  };

  changeFormTitle = (e) => {
    this.setState({
      requestFormTitle: e.target.value,
    });
  };

  changeFormPrivacy = (e) => {
    e.preventDefault();
    this.setState({
      requestFormPrivacy: e.currentTarget.dataset.privacy,
    });
  };

  submitRequestForm = (e) => {
    e.preventDefault();
    const { submitForm } = this.props;
    const { requestFormTitle, requestFormText, requestFormPrivacy } = this.state;

    submitForm({
      requestFormTitle,
      requestFormText,
      requestFormPrivacy,
    });
  };

  render() {
    const { closeForm, intl } = this.props;

    const { requestFormTitle, requestFormText, requestFormPrivacy } = this.state;

    return (
      <form className="root">
        <div className="title">
          <FormattedMessage {...messages.RequestGroup} />
        </div>
        <div className="input-container">
          <input
            name="title"
            className="field-input"
            type="text"
            id="group-title"
            value={requestFormTitle}
            placeholder={intl.formatMessage(messages.GroupTitle)}
            onChange={this.changeFormTitle}
          />
        </div>
        <div className="input-container">
          <textarea
            className="field-input"
            value={requestFormText}
            onChange={this.onChangeRequestForm}
            placeholder={intl.formatMessage(messages.GroupDescription)}
          />
        </div>
        <div className="button-container">
          <div className="privacy-buttons">
            <Button
              onClickEvent={this.changeFormPrivacy}
              data-privacy="public"
              text={intl.formatMessage(messages.PublicGroup)}
              isActive={requestFormPrivacy === 'public'}
            />
            <Button
              onClickEvent={this.changeFormPrivacy}
              data-privacy="private"
              text={intl.formatMessage(messages.PrivateGroup)}
              isActive={requestFormPrivacy === 'private'}
            />
          </div>
          <div className="actions">
            <Button onClickEvent={closeForm} text={intl.formatMessage(messages.Cancel)} />
            <Button
              onClickEvent={this.submitRequestForm}
              text={intl.formatMessage(messages.Submit)}
            />
          </div>
        </div>
        <style jsx>{styles}</style>
      </form>
    );
  }
}

export default injectIntl(RequestGroupForm);
