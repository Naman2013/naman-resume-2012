import React from 'react';
import TelescopeImageViewer from '../common/telescope-image-viewer/telescope-image-viewer';
import VideoImageLoader from '../common/telescope-image-loader/video-image-loader';

export default function determineImageLoader(instrument) {
  const {
    instrImageSourceType,
    instrCameraSourceType,
  } = instrument;

  if (instrImageSourceType === 'SSE') {
    return (
      <TelescopeImageViewer
        telePort={instrument.instrPort}
        teleSystem={instrument.instrSystem}
        teleId={instrument.instrTelescopeId}
        teleFade={instrument.instrFade}
      />
    );
  } else if (instrImageSourceType === 'video') {
    const {
      instrStreamCode,
      instrStreamURL,
      instrStreamThumbnailVideoWidth,
      instrStreamThumbnailVideoHeight,
      instrStreamThumbnailQuality,
      instrSystem,
      instrPort,
    } = instrument;

    return (
      <div>
        <VideoImageLoader
          teleStreamCode={instrStreamCode}
          teleStreamURL={instrStreamURL}
          teleStreamThumbnailVideoWidth="810"
          teleStreamThumbnailVideoHeight="455"
          teleStreamThumbnailQuality={instrStreamThumbnailQuality}
          teleSystem={instrSystem}
          telePort={instrPort}
          cameraSourceType={instrCameraSourceType}
        />
        <style jsx>{`
          div {
            height: 370px;
            overflow: hidden;
          }
      `}</style>
      </div>
    );
  }

  return null;
}
