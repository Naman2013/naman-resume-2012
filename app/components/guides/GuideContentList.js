import React from 'react';
import PropTypes from 'prop-types';
import AbelList from '../common/AbelList';
import TopicActions from './TopicActions';
import style from './GuideContentList.style';

const GuideContentList = ({ list, topicActionProps, guideId }) => (
  <div className="root">
    <AbelList theme={{ horizontalList: { boxShadow: 'inset 0px 5px 20px -5px #e0e0e0' } }} list={list} />
    <TopicActions {...topicActionProps} guideId={guideId} />
    <style jsx>{style}</style>
  </div>
);

GuideContentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  topicActionProps: PropTypes.shape({
    followButtonIconURL: PropTypes.string.isRequired,
    followButtonText: PropTypes.string.isRequired,
  }).isRequired,
  guideId: PropTypes.string.isRequired,
};

GuideContentList.defaultProps = {
  list: [],
};

export default GuideContentList;
