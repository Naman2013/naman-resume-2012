import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import {useTranslation} from 'react-i18next';
import cx from 'classnames';
import { horizontalArrow } from 'app/styles/variables/iconURLs';
import style from './step-list-item.style';

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
  stepIconURL,
  itemType,
}) => {
  const { t } = useTranslation();
  return showStepCard ? (
    <div className={cx('root', { disabled: !stepEnabled })} key={uniqueId()}>
      <h5 className="title">
        {stepTitle}
        {stepCompleted ? (
          <img
            className="check-icon"
            src={stepIconURL}
            alt={t('Quests.CompletedIcon')}
          />
        ) : (
          <img
            className="check-icon"
            src={stepIconURL}
            alt={t('Quests.IncompletedIcon')}
          />
        )}
      </h5>

      <div className="action-container">
        <div
          className={cx('action-left', { 'justify-flex-end': !stepStatusMsg })}
        >
          {stepStatusMsg}
          {stepCompleted ? (
            <img
              className="check"
              src={stepIconURL}
              alt={t('Quests.CompletedIcon')}
            />
          ) : (
            <img
              className="check"
              src={stepIconURL}
              alt={t('Quests.IncompletedIcon')}
            />
          )}
        </div>
        {showActionMsg && (
          <div
            className="action-right"
            onClick={() => goToStep(stepModuleId, itemType)}
          >
            <span className="action-message">{stepActionMsg}</span>
            <div className="arrow-container">
              <img
                alt={t('Quests.GoTo')}
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

};

StepListItem.defaultProps = {};

export default StepListItem;
