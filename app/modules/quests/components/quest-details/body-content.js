import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import AboutContent from 'app/components/guides/AboutContent';
import ResourcesButton from './resources-button.redux';
import style from './body-content.style';

const BodyContent = ({
  title,
  content,
  showResources,
  resourcesProps,
  theme,
  showAboutDownloadPDF,
  onDownloadPDF,
  aboutDownloadPDFTooltipText,
  showAboutCurriculum,
  aboutCurriculumText,
}) => {
  return (
    <div className="root" style={theme}>
      <h4 className="title">{title}</h4>
      <AboutContent
        content={content}
        showAboutCurriculum={showAboutCurriculum}
        aboutCurriculumText={aboutCurriculumText}
      />
      <div id="google-classroom-share" />
      <DisplayAtBreakpoint screenMedium>
        <div className="quest-content-buttons-container">
          {showResources ? <ResourcesButton {...resourcesProps} /> : null}
          {showAboutDownloadPDF && (
            <Tooltip
              title={aboutDownloadPDFTooltipText}
              position="top"
              theme="light"
            >
              <div className="download-quest-pdf">
                <div onClick={onDownloadPDF} className="download">
                  <span className="icon-download" />
                </div>
              </div>
            </Tooltip>
          )}
        </div>
      </DisplayAtBreakpoint>
      <style jsx>{style}</style>
    </div>
  );
};

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
