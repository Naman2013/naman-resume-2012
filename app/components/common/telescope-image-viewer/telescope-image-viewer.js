import React from 'react';
import PropTypes from 'prop-types';
import InteractiveViewer from '../interactive-viewer/interactive-viewer';
import TelescopeImageLoader from '../telescope-image-loader/telescope-image-loader';
import generateSseImageLoader from '../../../utils/generate-sse-image-source';
import obsIdTeleIdDomeIdFromTeleId from '../../../utils/obsid-teleid-domeid-from-teleid';

import './telescope-image-viewer.scss';
import StarShareCamera from '../../telescope-details/star-share-camera/star-share-camera';

function TelescopeImageViewer({
  telePort,
  teleSystem,
  teleId,
  teleFade,
  clipped,
  missionFormat,
  isInteractive,
  callSource,
}) {
  const setIds = obsIdTeleIdDomeIdFromTeleId(teleId);
  const teleThumbWidth = '866px';
  const imageSource = generateSseImageLoader(teleSystem, telePort);

  //TODO rewrite this cause i`d rather never write something like this
  const viewportHeight = Array.prototype.filter.call(document.getElementsByClassName('live-video-container'), x => x.offsetWidth !== 0)[0].offsetWidth;

  return (
    <div className="telescope-image-viewer">
      <InteractiveViewer isInteractive={isInteractive} callSource={callSource}>
        <TelescopeImageLoader
          imageSource={imageSource}
          teleId={setIds.teleId}
          obsId={setIds.obsId}
          domeId={setIds.domeId}
          teleThumbWidth={teleThumbWidth}
          teleFade={teleFade}
          clipped={clipped}
          missionFormat={missionFormat}
          viewportHeight={viewportHeight}
        />

        <StarShareCamera />
      </InteractiveViewer>
    </div>
  );
}

TelescopeImageViewer.defaultProps = {
  clipped: false,
  missionFormat: 'full',
  isInteractive: true,
  callSource: 'details',
};

TelescopeImageViewer.propTypes = {
  clipped: PropTypes.bool,
  missionFormat: PropTypes.string,
  isInteractive: PropTypes.bool,
};

export default TelescopeImageViewer;
