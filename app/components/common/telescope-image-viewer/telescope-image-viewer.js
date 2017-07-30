import React from 'react';
import PropTypes from 'prop-types';
import InteractiveViewer from '../interactive-viewer/interactive-viewer';
import TelescopeImageLoader from '../telescope-image-loader/telescope-image-loader';
import generateSseImageLoader from '../../../utils/generate-sse-image-source';
import obsIdTeleIdDomeIdFromTeleId from '../../../utils/obsid-teleid-domeid-from-teleid';

import './telescope-image-viewer.scss';

// TODO: test this to make sure we are still functioning
function TelescopeImageViewer({
  telePort,
  teleSystem,
  teleId,
  teleFade,
  clipped,
  missionFormat,
  isInteractive,
}) {
  const setIds = obsIdTeleIdDomeIdFromTeleId(teleId);
  const teleThumbWidth = '866px';
  const imageSource = generateSseImageLoader(teleSystem, telePort);

  return (
    <div
      className="telescope-image-viewer"
    >

      <InteractiveViewer
        isInteractive={isInteractive}
      >

        <TelescopeImageLoader
          imageSource={imageSource}
          teleId={setIds.teleId}
          obsId={setIds.obsId}
          domeId={setIds.domeId}
          teleThumbWidth={teleThumbWidth}
          teleFade={teleFade}
          clipped={clipped}
          missionFormat={missionFormat}

        />

      </InteractiveViewer>

    </div>
  );
}

TelescopeImageViewer.defaultProps = {
  clipped: false,
  missionFormat: 'full',
  isInteractive: true,
};

TelescopeImageViewer.propTypes = {
  clipped: PropTypes.bool,
  missionFormat: PropTypes.string,
  isInteractive: PropTypes.bool,
};

export default TelescopeImageViewer;
