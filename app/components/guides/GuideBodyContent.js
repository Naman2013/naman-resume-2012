import React from 'react';
import PropTypes from 'prop-types';
import TopicActions from './TopicActions';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import AboutContent from './AboutContent';
import style from './GuideBodyContent.style';

const GuideBodyContent = ({
  title,
  content,
  topicActionProps,
  guideId,
  footer,
  theme,
}) => (
  <div className="root" style={theme}>
    <h4 className="title">{title}</h4>
    <AboutContent content={content} />
    <DisplayAtBreakpoint
      screenMedium
    >
      <TopicActions {...topicActionProps} guideId={guideId} />
    </DisplayAtBreakpoint>
    {footer ? footer() : null}
    <style jsx>{style}</style>
  </div>
);

GuideBodyContent.propTypes = {
  footer: PropTypes.func,
  theme: PropTypes.shape({}),
  title: PropTypes.string,
  content: PropTypes.string,
  topicActionProps: PropTypes.shape({
    followButtonText: PropTypes.string.isRequired,
    followButtonIconURL: PropTypes.string.isRequired,
  }).isRequired,
  guideId: PropTypes.string.isRequired,
};

GuideBodyContent.defaultProps = {
  footer: null,
  theme: {},
  title: '',
  content: '',
};

export default GuideBodyContent;
