import React from 'react';
import PropTypes from 'prop-types';
import {
  horizontalArrow,
  complete,
  incomplete,
} from 'styles/variables/iconURLs';
import style from './step-list-item.style';

const StepListItem = ({
  stepModuleId,
  stepModuleIdUser,
  stepSequence,
  stepTitle,
  stepFullTitle,
  stepMenuTitle,
  stepCompleted,
  stepStatusMsg,
  stepActionMsg,
}) => (
  <div className="root">
    <h5 className="title">
      {stepTitle}
      {stepCompleted ? <img className="check-icon" src={complete} alt="completed icon" /> :
      <img className="check-icon" src={incomplete} alt="incompleted icon" />
      }
    </h5>

    <div className="action-container">
      <div className="action-left">
        {stepStatusMsg}
      </div>
      <div className="action-right">
        <span className="action-message">{stepActionMsg}</span>
        <img alt="" src={horizontalArrow} />
      </div>

    </div>
    <style jsx>{style}</style>
  </div>
);

StepListItem.defaultProps = {
  stepModuleId: PropTypes.number.isRequired,
  stepModuleIdUser: PropTypes.number.isRequired,
  stepSequence: PropTypes.number.isRequired,
  stepTitle: PropTypes.string.isRequired,
  stepFullTitle: PropTypes.string.isRequired,
  stepMenuTitle: PropTypes.string.isRequired,
  stepCompleted: PropTypes.bool.isRequired,
  stepStatusMsg: PropTypes.string.isRequired,
  stepActionMsg: PropTypes.string.isRequired,
};

StepListItem.propTypes = {
};

export default StepListItem;
