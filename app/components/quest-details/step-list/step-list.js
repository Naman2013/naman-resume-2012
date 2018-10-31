import React from 'react';
import PropTypes from 'prop-types';
import StepListItem from 'components/quest-details/step-list-item';
import style from './step-list.style';

const QuestStepList = ({
  list,
}) => (
  <div className="root">
    {list.map(item => <StepListItem {...item} />)}
    <style jsx>{style}</style>
  </div>
);

QuestStepList.defaultProps = {
  list: [],
};

QuestStepList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    stepModuleId: PropTypes.number,
    stepModuleIdUser: PropTypes.number,
    stepSequence: PropTypes.number,
    stepTitle: PropTypes.string,
    stepFullTitle: PropTypes.string,
    stepMenuTitle: PropTypes.string,
    stepCompleted: PropTypes.bool,
    stepStatusMsg: PropTypes.string,
    stepActionMsg: PropTypes.string,
  })),
};

export default QuestStepList;
