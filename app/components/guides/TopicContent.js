import React from 'react';
import PropTypes from 'prop-types';
import CenterColumn from 'components/common/CenterColumn';
import TopicHeading from './TopicHeading';
import TopicBodyContent from './TopicBodyContent';
import TopicContentList from './TopicContentList';
import style from './TopicContent.style';

const TopicContent = ({
  title,
  topicContentList,
  aboutTitle,
  aboutContent,
  topicActionProps,
  guideId,
}) => (
  <div className="root">
    <CenterColumn>
      <div className="title-container">
        <TopicHeading text={title} />
      </div>
    </CenterColumn>
    <CenterColumn>
      <div className="guide-container">
        <TopicContentList
          list={topicContentList}
          topicActionProps={topicActionProps}
          guideId={guideId}
        />
        <TopicBodyContent
          title={aboutTitle}
          content={aboutContent}
          topicActionProps={topicActionProps}
          guideId={guideId}
        />
      </div>
    </CenterColumn>
    <style jsx>{style}</style>
  </div>
);

TopicContent.propTypes = {
  title: PropTypes.string.isRequired,
  topicContentList: PropTypes.arrayOf(PropTypes.string).isRequired,
  aboutTitle: PropTypes.string.isRequired,
  aboutContent: PropTypes.string.isRequired,
  topicActionProps: PropTypes.shape({
    followButtonText: PropTypes.string.isRequired,
    followButtonIconURL: PropTypes.string.isRequired,
  }).isRequired,
  guideId: PropTypes.string.isRequired,
};

export default TopicContent;
