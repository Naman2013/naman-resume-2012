/** *********************************
 * V4 Request Group Form Feedback Screen
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from 'app/components/common/style/buttons/Button';
import styles from './request-group-form.style';
import messages from './request-group-from.messages';

const { func, string } = PropTypes;

const PromptWithClose = ({ closeForm, promptText }) => {
  const { t } = useTranslation();
  return (
    <form className="root">
      <div
        className="prompt-text"
        dangerouslySetInnerHTML={{ __html: promptText }}
      />
      <div className="actions">
        <Button onClickEvent={closeForm} text={t('.Close')} />
      </div>
      <style jsx>{styles}</style>
    </form>
  );
};

PromptWithClose.propTypes = {
  closeForm: func.isRequired,
  promptText: string.isRequired,
};

export default injectIntl(PromptWithClose);
