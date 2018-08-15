import React from 'react';
import PropTypes from 'prop-types';
import TopicActions from './TopicActions';
import AbelList from '../common/AbelList';
import style from './TopicContentList.style';

const TopicContentList = ({
  list,
  theme,
  topicActionProps,
  guideID,
}) => (
  <div style={theme} className="root">
    <AbelList list={list} />
    <div className="action-container">
      {
        topicActionProps.showActions &&
          <TopicActions
            {...topicActionProps}
            guideID={guideID}
          />
      }
    </div>
    <style jsx>{style}</style>
  </div>
);

TopicContentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  theme: PropTypes.shape({}),
  topicActionProps: PropTypes.shape({
    followButtonText: PropTypes.string.isRequired,
    followButtonIconURL: PropTypes.string.isRequired,
    showActions: PropTypes.bool.isRequired,
  }).isRequired,
  guideID: PropTypes.string.isRequired,
};

TopicContentList.defaultProps = {
  list: [],
  theme: {},
};

export default TopicContentList;
