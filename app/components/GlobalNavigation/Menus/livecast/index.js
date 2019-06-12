// @flow

import { LiveShowControl } from 'app/components/GlobalNavigation/Menus/livecast/liveshow-control';
import { LivecastPopup } from 'app/components/GlobalNavigation/Menus/livecast/popup';
import type { TLivecastData } from 'app/components/GlobalNavigation/Menus/livecast/types';
import axios from 'axios';
import React, { PureComponent } from 'react';
import YouTube from 'react-youtube';
import './styles.scss';

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
  YTPlayer: {};

  state = {
    livecastData: {},
    isOpen: false,
    playingVideoId: null,
    volume: 50,
    liveShows: [],
  };

  componentDidMount = () => {
    const { user } = this.props;
    const { cid, at, token } = user;
    axios
      .post('/api/events/getLivecast', { cid, at, token })
      .then(({ data }) => {
        const { LiveShowData = [] } = data;
        this.setState({
          livecastData: data,
          liveShows: [...LiveShowData],
        });
      });
  };

  setOpen = isOpen => this.setState({ isOpen });

  onPlayerReady = event => {
    let { volume } = this.state;

    this.YTPlayer = event.target;
    this.YTPlayer.setVolume(volume);
    this.YTPlayer.pauseVideo();
  };

  setVolume = volume =>
    this.setState({ volume }, () => this.YTPlayer.setVolume(volume));

  setPlay = playingVideoId =>
    this.setState({ playingVideoId }, () => this.YTPlayer.playVideo());

  render() {
    const { onClick } = this.props;
    const {
      livecastData,
      isOpen,
      volume,
      playingVideoId,
      liveShows,
    } = this.state;

    const { displayTitle } = livecastData;

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

        <YouTube
          onReady={this.onPlayerReady}
          videoId={playingVideoId}
          opts={YT_OPTIONS}
        />

        {isOpen && (
          <LivecastPopup setOpen={this.setOpen} title={displayTitle}>
            <>
              {liveShows.map(liveShow => (
                <LiveShowControl
                  key={liveShow.livecastId}
                  liveShow={liveShow}
                  volume={volume}
                  setPlay={this.setPlay}
                  isPlaying={playingVideoId === liveShow.streamCode}
                  onVolumeChange={this.setVolume}
                />
              ))}
            </>
          </LivecastPopup>
        )}
      </div>
    );
  }
}
