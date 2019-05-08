import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import TopicActions from './TopicActions';
import AboutContent from './AboutContent';
import style from './GuideBodyContent.style';

const GuideBodyContent = ({
  title,
  content,
  topicActionProps,
  guideId,
  footer,
  theme,
  showGoogleClassroomShareIcon
}) => {
  useEffect(() => {
    if(showGoogleClassroomShareIcon){
    const script = document.createElement('script');
    script.onload = () => {
      gapi.sharetoclassroom.render('google-classroom-share', {
        url: window.location,
        size: '32',
      });
    };
    script.src = 'https://apis.google.com/js/platform.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }
  });

  return (
    <div className="root" style={theme}>
      <h4 className="title">{title}</h4>
      <AboutContent content={content} />
      <div id="google-classroom-share" />
      <DisplayAtBreakpoint screenMedium>
        {topicActionProps.showActions && (
          <TopicActions {...topicActionProps} guideId={guideId} />
        )}
      </DisplayAtBreakpoint>
      {footer ? footer() : null}
      <style jsx>{style}</style>
    </div>
  );
};

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
