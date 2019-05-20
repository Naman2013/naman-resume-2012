import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import StepListItem from 'app/components/quest-details/step-list-item';
import style from './step-list.style';

const QuestStepList = ({ list, goToStep }) => (
  <div className="root">
    {list.map(item => (
      <StepListItem {...item} goToStep={goToStep} />
    ))}
    <style jsx>{style}</style>
  </div>
);

QuestStepList.defaultProps = {
  list: [],
  goToStep: noop,
};

QuestStepList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      stepModuleId: PropTypes.number,
      stepModuleIdUser: PropTypes.number,
      stepSequence: PropTypes.number,
      stepTitle: PropTypes.string,
      stepFullTitle: PropTypes.string,
      stepMenuTitle: PropTypes.string,
      stepCompleted: PropTypes.bool,
      stepStatusMsg: PropTypes.string,
      stepActionMsg: PropTypes.string,
    })
  ),
  goToStep: PropTypes.func,
};

export default QuestStepList;
