/** *********************************
 * V4 Request Group Form Feedback Screen
 *
 *
 *
 ********************************** */

import Button from 'app/components/common/style/buttons/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './request-group-form.style';

const { func, string } = PropTypes;

const RequestGroupFormFeedback = ({ closeForm, requestNew, promptText }) => {
  const { t } = useTranslation();
  return (
    <form className="root">
      <div className="title">{t('Clubs.RequestGroup')}</div>
      <div
        className="prompt-text"
        dangerouslySetInnerHTML={{ __html: promptText }}
      />
      <div className="actions">
        <Button onClickEvent={closeForm} text={t('Clubs.Close')} />
        <Button
          onClickEvent={requestNew}
          text={t('Clubs.RequestAnotherGroup')}
        />
      </div>
      <style jsx>{styles}</style>
    </form>
  );
};

RequestGroupFormFeedback.propTypes = {
  closeForm: func.isRequired,
  requestNew: func.isRequired,
  promptText: string.isRequired,
};

export default RequestGroupFormFeedback;
