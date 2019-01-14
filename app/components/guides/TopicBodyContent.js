import React from 'react';
import PropTypes from 'prop-types';
import TopicActions from './TopicActions';
import RubyTitle from 'atoms/titles/RubyTitle';
import AboutContent from './AboutContent';
import style from './TopicBodyContent.style';

const TopicBodyContent = ({
  aboutTitle,
  aboutContent,
  topicActionProps,
  ...restProps
}) => (
  <div className="root">
    <div className="title-wrapper">
      <RubyTitle text={aboutTitle} />
    </div>
    <AboutContent content={aboutContent} />
    <div className="action-container">
      {
        topicActionProps.showActions &&
          <TopicActions
            {...topicActionProps}
            {...restProps}
          />
      }
    </div>
    <style jsx>{style}</style>
  </div>
);

TopicBodyContent.propTypes = {
  aboutTitle: PropTypes.string.isRequired,
  aboutContent: PropTypes.string.isRequired,
  topicActionProps: PropTypes.shape({
    followButtonText: PropTypes.string.isRequired,
    followButtonIconURL: PropTypes.string.isRequired,
    showActions: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TopicBodyContent;
