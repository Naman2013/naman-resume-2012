import React from 'react';
import PropTypes from 'prop-types';
import ResourcesButton from './resources-button';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import AboutContent from './AboutContent';
import style from './about-quest-content.style';

const AboutQuest = ({
  title,
  content,
  resourcesProps,
  questId,
  footer,
  theme,
}) => (
  <div className="root" style={theme}>
    <h4 className="title">{title}</h4>
    <AboutContent content={content} />
    <DisplayAtBreakpoint
      screenMedium
    >
      <ResourcesButton {...resourcesProps} questId={questId} />
    </DisplayAtBreakpoint>
    {footer ? footer() : null}
    <style jsx>{style}</style>
  </div>
);

AboutQuest.propTypes = {
  footer: PropTypes.func,
  theme: PropTypes.shape({}),
  title: PropTypes.string,
  content: PropTypes.string,
  resourcesProps: PropTypes.shape({
    followButtonText: PropTypes.string.isRequired,
    followButtonIconURL: PropTypes.string.isRequired,
  }).isRequired,
  questId: PropTypes.string.isRequired,
};

AboutQuest.defaultProps = {
  footer: null,
  theme: {},
  title: '',
  content: '',
};

export default AboutQuest;
