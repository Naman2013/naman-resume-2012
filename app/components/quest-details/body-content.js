import React from 'react';
import PropTypes from 'prop-types';
import ResourcesButton from './resources-button.redux';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import AboutContent from 'app/components/guides/AboutContent';
import style from './body-content.style';

const BodyContent = ({
  title,
  content,
  showResources,
  resourcesProps,
  theme,
}) => (
  <div className="root" style={theme}>
    <h4 className="title">{title}</h4>
    <AboutContent content={content} />
    <DisplayAtBreakpoint screenMedium>
      {showResources ? <ResourcesButton {...resourcesProps} /> : null}
    </DisplayAtBreakpoint>
    <style jsx>{style}</style>
  </div>
);

BodyContent.propTypes = {
  footer: PropTypes.func,
  theme: PropTypes.shape({}),
  title: PropTypes.string,
  showResources: PropTypes.bool,
  content: PropTypes.string,
  resourcesProps: PropTypes.shape({
    resourcesIconUrl: PropTypes.string.isRequired,
    resourcesButtonText: PropTypes.string.isRequired,
  }).isRequired,
};

BodyContent.defaultProps = {
  showResources: true,
  footer: null,
  theme: {},
  title: '',
  content: '',
};

export default BodyContent;
