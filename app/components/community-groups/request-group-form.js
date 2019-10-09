/** *********************************
 * V4 Request Group Form
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Button from 'app/components/common/style/buttons/Button';
import styles from './request-group-form.style';

const { func } = PropTypes;

@withTranslation
class RequestGroupForm extends Component {
  static propTypes = {
    closeForm: func.isRequired,
    submitForm: func.isRequired,

  };

  static defaultProps = {};

  state = {
    requestFormText: '',
    requestFormPrivacy: 'public',
  };

  onChangeRequestForm = e => {
    e.preventDefault();
    this.setState({
      requestFormText: e.target.value,
    });
  };

  changeFormTitle = e => {
    this.setState({
      requestFormTitle: e.target.value,
    });
  };

  changeFormPrivacy = e => {
    e.preventDefault();
    this.setState({
      requestFormPrivacy: e.currentTarget.dataset.privacy,
    });
  };

  submitRequestForm = e => {
    e.preventDefault();
    const { submitForm } = this.props;
    const {
      requestFormTitle,
      requestFormText,
      requestFormPrivacy,
    } = this.state;

    submitForm({
      requestFormTitle,
      requestFormText,
      requestFormPrivacy,
    });
  };

  render() {
    const { closeForm, t } = this.props;

    const {
      requestFormTitle,
      requestFormText,
      requestFormPrivacy,
    } = this.state;

    return (
      <form className="root">
        <div className="title">{t('Clubs.RequestGroup')}</div>
        <div className="input-container">
          <input
            name="title"
            className="field-input"
            type="text"
            id="group-title"
            value={requestFormTitle}
            placeholder={t('Clubs.GroupTitle')}
            onChange={this.changeFormTitle}
          />
        </div>
        <div className="input-container">
          <textarea
            className="field-input"
            value={requestFormText}
            onChange={this.onChangeRequestForm}
            placeholder={t('Clubs.GroupDescription')}
          />
        </div>
        <div className="button-container">
          <div className="privacy-buttons">
            <Button
              onClickEvent={this.changeFormPrivacy}
              data-privacy="public"
              text={t('Clubs.PublicGroup')}
              isActive={requestFormPrivacy === 'public'}
            />
            <Button
              onClickEvent={this.changeFormPrivacy}
              data-privacy="private"
              text={t('Clubs.PrivateGroup')}
              isActive={requestFormPrivacy === 'private'}
            />
          </div>
          <div className="actions">
            <Button onClickEvent={closeForm} text={t('Clubs.Cancel')} />
            <Button onClickEvent={this.submitRequestForm} text={t('Clubs.Submit')} />
          </div>
        </div>
        <style jsx>{styles}</style>
      </form>
    );
  }
}

export default RequestGroupForm;
