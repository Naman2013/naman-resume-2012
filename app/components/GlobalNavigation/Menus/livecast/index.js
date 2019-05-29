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
  height: '210',
  width: '210',
  playerVars: {
    autoplay: 1,
  },
};

const R = {
  ver: 'v1',
  lang: 'en',
  apiError: false,
  errorCode: 0,
  errorMsg: '',
  statusCode: 200,
  test1: '8',
  displayTitle: 'Listen to this live audio show!',
  LiveShowData: [
    {
      livecastId: '5',
      title: 'Test Show 2.5',
      hostName: 'ColinLynch',
      streamCode: 'YBzMGZd3RPE',
      startTime: '1559044800',
      endTime: '1559304000',
      formattedStartTime: '05/28/2019 12:00:00 PM',
      formattedEndTime: '05/31/2019 12:00:00 PM',
      description: 'Test Edit description 2',
    },
    {
      livecastId: '10',
      title: 'Tests quick show 2',
      hostName: 'Mike Kastke',
      streamCode: 'BTSosSzjbd4',
      startTime: '1559044800',
      endTime: '1559304000',
      formattedStartTime: '05/28/2019 12:00:00 PM',
      formattedEndTime: '05/31/2019 12:00:00 PM',
      description: 'Test Edit Description',
    },
    {
      livecastId: '11',
      title: 'Tests quick show 3',
      hostName: 'Mike Kastke',
      streamCode: 'gasP4MEdkss',
      startTime: '1559044800',
      endTime: '1559304000',
      formattedStartTime: '05/28/2019 12:00:00 PM',
      formattedEndTime: '05/31/2019 12:00:00 PM',
      description: 'Test Edit Description 3',
    },
  ],
  UpcommingShowData: [
    {
      livecastId: '1',
      title: 'Test Quick Show',
      hostName: 'Mike Kastke',
      streamCode: '3RZ9Kj1kr_8',
      startTime: '1569248400',
      endTime: '1569369647',
      formattedStartTime: '09/23/2019 02:20:00 PM',
      formattedEndTime: '09/25/2019 12:00:47 AM',
      description: 'Test Edit Description',
      countdownTests: 2811.0686111111113,
    },
    {
      livecastId: '8',
      title: 'Test create2',
      hostName: null,
      streamCode: 'HF7824JC-62',
      startTime: '1600864200',
      endTime: '1600952400',
      formattedStartTime: '09/23/2020 12:30:00 PM',
      formattedEndTime: '09/24/2020 01:00:00 PM',
      description: ';lkasdfk;j',
      countdownTests: 11593.235277777778,
    },
  ],
  isLive: true,
};

export class Livecast extends PureComponent<TLivecast, TState> {
  YTPlayer: null;

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
      .then((/*{ data }*/) => {
        const data = R; // todo temp mocked
        this.setState({
          livecastData: data,
          liveShows: [...data.LiveShowData],
        });
      });
  };

  setOpen = isOpen => this.setState({ isOpen });

  onPlayerReady = event => {
    console.log('ON_PLAYER_READY');
    let { volume } = this.state;

    this.YTPlayer = event.target;
    this.YTPlayer.setVolume(volume);
    this.YTPlayer.pauseVideo();
  };

  setVolume = volume =>
    this.setState({ volume }, () => this.YTPlayer.setVolume(volume));

  setPlay = playingVideoId =>
    this.setState(
      { playingVideoId },
      () => {
        console.log('play');
        this.YTPlayer.playVideo();
      }
      // playingVideoId ? this.YTPlayer.playVideo() : this.YTPlayer.stopVideo()
    );

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

        <YouTube
          onReady={this.onPlayerReady}
          videoId={playingVideoId}
          opts={YT_OPTIONS}
        />

        {isOpen && (
          <LivecastPopup
            setOpen={this.setOpen}
            title={displayTitle}
            playingVideoId={playingVideoId}
            liveShows={liveShows}
          >
            <>
              {liveShows.map(liveShow => (
                <LiveShowControl
                  key={liveShow.livecastId}
                  liveShow={liveShow}
                  volume={volume}
                  play={() => this.setPlay(liveShow.streamCode)}
                  stop={() => this.setPlay(null)}
                  isPlaying={playingVideoId === liveShow.streamCode}
                />
              ))}
            </>
          </LivecastPopup>
        )}
      </div>
    );
  }
}
