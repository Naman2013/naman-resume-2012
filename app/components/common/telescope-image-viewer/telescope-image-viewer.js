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
}) {
  const setIds = obsIdTeleIdDomeIdFromTeleId(teleId);
  const teleThumbWidth = '866px';
  const imageSource = generateSseImageLoader(teleSystem, telePort);

  return (
    <div
      className="telescope-image-viewer"
    >

      <InteractiveViewer>

        <TelescopeImageLoader
          imageSource={imageSource}
          teleId={setIds.teleId}
          obsId={setIds.obsId}
          domeId={setIds.domeId}
          teleThumbWidth={teleThumbWidth}
          teleFade={teleFade}
          clipped={clipped}
          missionFormat="full"
        />

      </InteractiveViewer>

    </div>
  );
}

TelescopeImageViewer.defaultProps = {
  clipped: false,
};

TelescopeImageViewer.propTypes = {
  clipped: PropTypes.bool,
};

export default TelescopeImageViewer;
