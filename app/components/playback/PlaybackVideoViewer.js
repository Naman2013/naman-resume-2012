import React, { Component, PropTypes } from 'react';
import VideoViewer from './VideoViewer';
import ViewerVideoDetails from './ViewerVideoDetails';
import s from './PlaybackVideoViewer.scss';

function PlaybackVideoViewer() {
  return (
    <div className={`${s.playbackVideoViewerRoot} col-xs-12 clearfix`}>

      <div className="col-xs-8">
        <VideoViewer />
      </div>

      <div className="col-xs-4">
        <ViewerVideoDetails />
      </div>
    </div>
  );
}

export default PlaybackVideoViewer;
