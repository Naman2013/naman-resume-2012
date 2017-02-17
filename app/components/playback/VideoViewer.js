import React from 'react';
import { Link } from 'react-router';
import s from './VideoViewer.scss';

function VideoViewer() {
  return (
    <div className={s.playerContainer}>
      <div className={s.player}>

      </div>

      <div className={s.videoTilesContainer}>
        <h3 className={s.title}>Other shows of interest</h3>
        <ul className={s.videoTiles}>
          <li className={s.videoTile}>
            <Link to="" className={s.tile}>Tile Image...</Link>
          </li>
          <li className={s.videoTile}>
            <Link to="" className={s.tile}>Tile Image...</Link>
          </li>
          <li className={s.videoTile}>
            <Link to="" className={s.tile}>Tile Image...</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default VideoViewer;
