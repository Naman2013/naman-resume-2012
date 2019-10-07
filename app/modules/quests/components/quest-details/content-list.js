import React from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import { Tooltip } from 'react-tippy';
import AbelList from '../../../../components/common/AbelList';
import ResourcesButton from './resources-button.redux';
import style from './content-list.style';

const ContentList = ({
  list,
  resourcesProps,
  showResources,
  showAboutDownloadPDF,
  onDownloadPDF,
  aboutDownloadPDFTooltipText,
}) => (
  <div className="root">
    <AbelList
      theme={{
        horizontalList: { boxShadow: 'inset 0px 5px 20px -5px #e0e0e0' },
      }}
      list={list}
    />
    <DisplayAtBreakpoint screenSmall screenLarge screenXLarge>
      <div className="quest-content-buttons-container">
        {showResources ? <ResourcesButton {...resourcesProps} /> : null}
        {showAboutDownloadPDF && (
          <Tooltip theme="light" title={aboutDownloadPDFTooltipText} position="top">
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

ContentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  resourcesProps: PropTypes.shape({
    resourcesIconUrl: PropTypes.string.isRequired,
    resourcesButtonText: PropTypes.string.isRequired,
  }).isRequired,
  showResources: PropTypes.bool.isRequired,
};

ContentList.defaultProps = {
  list: [],
};

export default ContentList;
