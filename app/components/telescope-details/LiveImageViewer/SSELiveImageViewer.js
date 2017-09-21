import React from 'react';
import PropTypes from 'prop-types';
import LiveImageViewer from './';
import VirtualTelescopeViewer from '../../VirtualTelescopeViewer';
import TelescopeImageLoader from '../../common/telescope-image-loader';
import obsIdTeleIdDomeIdFromTeleId from '../../../utils/obsid-teleid-domeid-from-teleid';

const SSELiveImageViewer = ({
  timestamp,
  coordinateArray,
  missionData,
  objectTitleShort,
  processing,
  schedulingMember,

  imageSource,
  teleThumbWidth,
  teleFade,
  clipped,
  missionFormat,
  teleId,
}) => {
  const { obsId, domeId } = obsIdTeleIdDomeIdFromTeleId(teleId);

  return (
    <LiveImageViewer>
      <VirtualTelescopeViewer
        timestamp={timestamp}
        coordinateArray={coordinateArray}
        missionData={missionData}
        objectTitleShort={objectTitleShort}
        processing={processing}
        schedulingMember={schedulingMember}
      >
        <TelescopeImageLoader
          imageSource={imageSource}
          teleId={teleId}
          obsId={obsId}
          domeId={domeId}
          teleThumbWidth={teleThumbWidth}
          teleFade={teleFade}
          clipped={clipped}
          missionFormat={missionFormat}
        />
      </VirtualTelescopeViewer>
    </LiveImageViewer>
  );
};

export default SSELiveImageViewer;
