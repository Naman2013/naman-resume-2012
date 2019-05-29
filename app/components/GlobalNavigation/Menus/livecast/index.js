// @flow

import { LivecastPopup } from 'app/components/GlobalNavigation/Menus/livecast/popup';
import type { TLivecastData } from 'app/components/GlobalNavigation/Menus/livecast/types';
import axios from 'axios';
import React, { PureComponent } from 'react';
import './styles.scss';
import YouTube from 'react-youtube';
import _keyBy from 'lodash/keyBy';

type TLivecast = {
  onClick: Function,
};

type TState = {
  livecastData: TLivecastData,
  isOpen: boolean,
  volume: number,
};

const YT_OPTIONS = {
  height: '210',
  width: '210',
  playerVars: {
    autoplay: 1,
  },
};

export class Livecast extends PureComponent<TLivecast, TState> {
  // YTPlayer: null;

  state = {
    livecastData: {},
    isOpen: false,
    isPlaying: false,
    volume: 50,
    liveShows: {},
  };

  componentDidMount = () => {
    const { user } = this.props;
    const { cid, at, token } = user;
    axios
      .post('/api/events/getLivecast', { cid, at, token })
      .then(({ data }) => {
        this.setState({
          livecastData: data,
          liveShows: _keyBy(data.LiveShowData, 'livecastId'),
        });
      });
  };

  getLiveShow = (liveShows, livecastId) =>
    liveShows.find(ls => ls.livecastId === livecastId);

  setOpen = isOpen => this.setState({ isOpen });

  onPlayerReady = (event, liveShow, id) => {
    let { volume, liveShows } = this.state;

    const ytPlayer = event.target;
    ytPlayer.setVolume(volume);
    ytPlayer.pauseVideo();

    // this.YTPlayer = ytPlayer;
    const newLiveShow = { ...liveShow };
    newLiveShow.ytPlayer = ytPlayer;

    liveShows = { ...liveShows, ...{ [id]: newLiveShow } };

    this.setState({ liveShows });
  };

  setVolume = volume =>
    this.setState({ volume }, () => this.YTPlayer.setVolume(volume));

  setPlaying = isPlaying =>
    this.setState({ isPlaying }, () =>
      isPlaying ? this.YTPlayer.playVideo() : this.YTPlayer.stopVideo()
    );

  render() {
    const { onClick } = this.props;
    const { livecastData, isOpen, volume, isPlaying, liveShows } = this.state;

    console.log(liveShows);

    return (
      <div className="livecast-btn">
        <span
          role="presentation"
          className="icon-volume"
          onClick={() => {
            onClick();
            this.setOpen(true);
          }}
        />

        {Object.values(liveShows).map(liveShow => (
          <YouTube
            onReady={e => this.onPlayerReady(e, liveShow, liveShow.livecastId)}
            videoId={liveShow.streamCode}
            opts={YT_OPTIONS}
          />
        ))}

        {isOpen && (
          <LivecastPopup
            setOpen={this.setOpen}
            livecastData={livecastData}
            onVolumeChange={this.setVolume}
            volume={volume}
            isPlaying={isPlaying}
            setPlaying={this.setPlaying}
            liveShows={liveShows}
          />
        )}
      </div>
    );
  }
}
