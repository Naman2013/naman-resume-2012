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
}) => (
  <div className="root">
    <CenterColumn>
      <div className="title-container">
        <TopicHeading text={title} />
      </div>
    </CenterColumn>
    <CenterColumn>
      <div className="guide-container">
        <TopicContentList list={topicContentList} />
        <TopicBodyContent title={aboutTitle} content={aboutContent} />
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
};

export default TopicContent;
