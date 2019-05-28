// @flow

import { LivecastPopup } from 'app/components/GlobalNavigation/Menus/livecast/popup';
import type { TLivecastData } from 'app/components/GlobalNavigation/Menus/livecast/types';
import axios from 'axios';
import React, { PureComponent } from 'react';
import './styles.scss';
import YouTube from 'react-youtube';

type TLivecast = {
  onClick: Function,
};

type TState = {
  livecastData: TLivecastData,
  isOpen: boolean,
  volume: number,
};

const YT_OPTIONS = {
  height: '0',
  width: '0',
  playerVars: {
    autoplay: 1,
  },
};

export class Livecast extends PureComponent<TLivecast, TState> {
  YTPlayer: null;

  state = {
    livecastData: {},
    isOpen: false,
    isPlaying: false,
    volume: 50,
  };

  componentDidMount = () => {
    const { user } = this.props;
    const { cid, at, token } = user;
    axios
      .post('/api/events/getLivecast', { cid, at, token })
      .then(({ data }) => {
        this.setState({ livecastData: data });
      });
  };

  setOpen = isOpen => this.setState({ isOpen });

  onPlayerReady = event => {
    const { volume } = this.state;
    event.target.setVolume(volume);
    event.target.pauseVideo();
    this.YTPlayer = event.target;
  };

  setVolume = volume =>
    this.setState({ volume }, () => this.YTPlayer.setVolume(volume));

  setPlaying = isPlaying =>
    this.setState({ isPlaying }, () =>
      isPlaying ? this.YTPlayer.playVideo() : this.YTPlayer.stopVideo()
    );

  render() {
    const { onClick } = this.props;
    const { livecastData, isOpen, volume, isPlaying } = this.state;
    const { LiveShowData = {} } = livecastData;
    let { streamCode } = LiveShowData;

    streamCode = 'KBoBIrqwf8o';

    console.log(livecastData);
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

        {streamCode && (
          <YouTube
            id="global-audio-player-instance"
            onReady={this.onPlayerReady}
            videoId={streamCode}
            opts={YT_OPTIONS}
          />
        )}

        {isOpen && (
          <LivecastPopup
            setOpen={this.setOpen}
            livecastData={livecastData}
            onVolumeChange={this.setVolume}
            volume={volume}
            isPlaying={isPlaying}
            setPlaying={this.setPlaying}
          />
        )}
      </div>
    );
  }
}
