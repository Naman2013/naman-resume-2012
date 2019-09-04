// @flow

import { LiveShowControl } from 'app/components/GlobalNavigation/Menus/livecast/liveshow-control';
import { LivecastPopup } from 'app/components/GlobalNavigation/Menus/livecast/popup';
import type { TLivecastData } from 'app/components/GlobalNavigation/Menus/livecast/types';
import axios from 'axios';
import React, { PureComponent } from 'react';
import YouTube from 'react-youtube';
import './styles.scss';
import { Spinner } from 'app/components/spinner/index';

type TLivecast = {
  onClick: Function,
};

type TState = {
  livecastData: TLivecastData,
  isOpen: boolean,
  volume: number,
};

const YT_OPTIONS = {
  height: '200', // 1
  width: '200', // 1
  playerVars: {
    autoplay: 1,
    playsinline: 1,
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
    loading: false,
  };

  refetchTimer: null;

  fetchData = () => {
    const { user } = this.props;
    const { cid, at, token } = user;
    axios
      .post('/api/events/getLivecast', { cid, at, token })
      .then(({ data }) => {
        const { LiveShowData = [], refreshInterval } = data;
        this.setState({
          livecastData: data,
          liveShows: [...LiveShowData],
        });

        this.refetchTimer = window.setTimeout(
          this.fetchData,
          refreshInterval * 1000
        );
      });
  };

  componentDidMount = () => {
    this.fetchData();
  };

  setOpen = isOpen => this.setState({ isOpen });

  onPlayerReady = event => {
    let { volume } = this.state;

    this.YTPlayer = event.target;
    // this.YTPlayer.playVideo();
    // this.YTPlayer.setVolume(volume);
    // this.YTPlayer.pauseVideo();
  };

  setVolume = volume =>
    this.setState({ volume }, () => this.YTPlayer.setVolume(volume));

  setPlay = playingVideoId =>
    this.setState({ playingVideoId }, () => this.YTPlayer.playVideo());

  setLoading = playerState => {
    if (playerState === -1 || playerState === 3) {
      this.setState({ loading: true });
    } else this.setState({ loading: false });
  };

  render() {
    const { onClick } = this.props;
    const {
      livecastData,
      isOpen,
      volume,
      playingVideoId,
      liveShows,
      loading,
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
          onStateChange={state => this.setLoading(state.data)}
          videoId={playingVideoId}
          opts={YT_OPTIONS}
        />

        {isOpen && (
          <LivecastPopup setOpen={this.setOpen} title={displayTitle}>
            <Spinner loading={loading} />
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
