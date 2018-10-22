import React from 'react';
import VideoImageLoader from '../common/telescope-image-loader/video-image-loader';
import SSELiveImageViewer from './LiveImageViewer/SSELiveImageViewer';

export default function determineImageLoader(instrument, { viewportHeight }) {
  const { instrImageSourceType, instrCameraSourceType } = instrument;

  if (instrImageSourceType === 'SSE') {
    return (
      <SSELiveImageViewer
        viewportHeight={viewportHeight}
        telePort={instrument.instrPort}
        teleSystem={instrument.instrSystem}
        teleId={instrument.instrTelescopeId}
        teleFade={instrument.instrFade}
        missionFormat="full"
      />
    );
  } else if (instrImageSourceType === 'video') {
    const {
      instrStreamCode,
      instrStreamURL,
      instrStreamThumbnailQuality,
      instrSystem,
      instrPort,
    } = instrument;

    return (
      <div className="root">
        <div className="mask">
          <VideoImageLoader
            teleStreamCode={instrStreamCode}
            teleStreamURL={instrStreamURL}
            teleStreamThumbnailVideoWidth="810"
            teleStreamThumbnailVideoHeight="600"
            teleStreamThumbnailQuality={instrStreamThumbnailQuality}
            teleSystem={instrSystem}
            telePort={instrPort}
            cameraSourceType={instrCameraSourceType}
          />
        </div>
        <style jsx>{`
          .root {
            overflow: hidden;
          }

          .mask {
            position: relative;
          }
        `}
        </style>
      </div>
    );
  }

  return null;
}
