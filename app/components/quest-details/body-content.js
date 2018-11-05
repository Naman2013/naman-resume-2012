import React from 'react';
import PropTypes from 'prop-types';
import ResourcesButton from './resources-button';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import AboutContent from 'components/guides/AboutContent';
import style from './body-content.style';

const BodyContent = ({
  title,
  content,
  resourcesProps,
  questId,
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
    <style jsx>{style}</style>
  </div>
);

BodyContent.propTypes = {
  footer: PropTypes.func,
  theme: PropTypes.shape({}),
  title: PropTypes.string,
  content: PropTypes.string,
  resourcesProps: PropTypes.shape({
    resourcesIconUrl: PropTypes.string.isRequired,
    resourcesButtonText: PropTypes.string.isRequired,
  }).isRequired,
  questId: PropTypes.string.isRequired,
};

BodyContent.defaultProps = {
  footer: null,
  theme: {},
  title: '',
  content: '',
};

export default BodyContent;
