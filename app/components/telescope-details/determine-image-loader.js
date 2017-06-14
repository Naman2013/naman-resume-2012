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
            height: 455px;
            overflow: hidden;
          }

          .mask {
            top: -71px;
            position: relative;
          }
      `}</style>
      </div>
    );
  }

  return null;
}
