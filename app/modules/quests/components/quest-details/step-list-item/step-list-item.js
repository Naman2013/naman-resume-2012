import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { intlShape, injectIntl } from 'react-intl';
import cx from 'classnames';
import {
  horizontalArrow,
  complete,
  incomplete,
} from 'app/styles/variables/iconURLs';
import style from './step-list-item.style';
import messages from './step-list-item.messages';

const StepListItem = ({
  stepModuleId,
  stepTitle,
  stepCompleted,
  stepStatusMsg,
  stepActionMsg,
  stepEnabled,
  showActionMsg,
  showStepCard,
  goToStep,
  intl,
}) => {
  return showStepCard ? (
    <div className={cx('root', { disabled: !stepEnabled })} key={uniqueId()}>
      <h5 className="title">
        {stepTitle}
        {stepCompleted ? (
          <img
            className="check-icon"
            src={complete}
            alt={intl.formatMessage(messages.CompletedIcon)}
          />
        ) : (
          <img
            className="check-icon"
            src={incomplete}
            alt={intl.formatMessage(messages.IncompletedIcon)}
          />
        )}
      </h5>

      <div className="action-container">
        <div className="action-left">
          {stepStatusMsg}
          {stepCompleted ? (
            <img
              className="check"
              src={complete}
              alt={intl.formatMessage(messages.CompletedIcon)}
            />
          ) : (
            <img
              className="check"
              src={incomplete}
              alt={intl.formatMessage(messages.IncompletedIcon)}
            />
          )}
        </div>
        {showActionMsg && (
          <div className="action-right" onClick={() => goToStep(stepModuleId)}>
            <span className="action-message">{stepActionMsg}</span>
            <div className="arrow-container">
              <img
                alt={intl.formatMessage(messages.GoTo)}
                src={horizontalArrow}
              />
            </div>
          </div>
        )}
      </div>
      <style jsx>{style}</style>
    </div>
  ) : null;
};

StepListItem.propTypes = {
  stepModuleId: PropTypes.number.isRequired,
  stepModuleIdUser: PropTypes.number.isRequired,
  stepSequence: PropTypes.number.isRequired,
  stepTitle: PropTypes.string.isRequired,
  stepFullTitle: PropTypes.string.isRequired,
  stepMenuTitle: PropTypes.string.isRequired,
  stepCompleted: PropTypes.bool.isRequired,
  stepStatusMsg: PropTypes.string.isRequired,
  stepActionMsg: PropTypes.string.isRequired,
  goToStep: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

StepListItem.defaultProps = {};

export default injectIntl(StepListItem);
