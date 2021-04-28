// @flow

import { LiveShowControl } from 'app/components/GlobalNavigation/Menus/livecast/liveshow-control';
import { LivecastPopup } from 'app/components/GlobalNavigation/Menus/livecast/popup';
import type { TLivecastData } from 'app/components/GlobalNavigation/Menus/livecast/types';
import { API } from 'app/api';
import React, { PureComponent, Fragment } from 'react';
import YouTube from 'react-youtube';
import './styles.scss';
import { Spinner } from 'app/components/spinner/index';
import classnames from 'classnames';
import { astronaut, romance } from 'app/styles/variables/colors_tiles_v4';

type TLivecast = {
  onClick: Function,
  allLivecastsInProgress: Shape,
};

type TState = {
  livecastData: TLivecastData,
  nbrLivecastsInProgress: number,
  isOpen: boolean,
  volume: number,
};

const YT_OPTIONS = {
  height: '1',
  width: '1',
  playerVars: {
    autoplay: 1,
    playsinline: 1,
  },
};

export class Livecast extends PureComponent<TLivecast, TState> {
  YTPlayer: {};

  state = {
    isOpen: false,
    playingVideoId: null,
    volume: 50,
    liveShows: [],
    nbrLivecastsInProgress: 0,
    loading: false,
  };

  refetchTimer: null;

  fetchData = () => {
    const { user } = this.props;
    const { cid, at, token } = user;
    API
      .post('/api/events/getLivecast', { cid, at, token })
      .then(({ data }) => {
        const { LiveShowData = [], refreshInterval } = data;
        this.setState({
	  displayTitle: data.displayTitle,
          liveShows: [...LiveShowData],
        });

	let numLivecasts = 0;

	LiveShowData.forEach(liveShow => {
		if (liveShow.isBroadcasting == true) {
			numLivecasts++;
		}
	});

	//update the number of livecasts in progress
	this.setState({ nbrLivecastsInProgress: numLivecasts });

        this.refetchTimer = window.setTimeout(
          this.fetchData,
          refreshInterval * 1000,
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

  onMute = () => this.YTPlayer.mute();

  onUnMute = () => this.YTPlayer.unMute();

  setPlay = playingVideoId =>
    this.setState({ playingVideoId }, () => this.YTPlayer.playVideo());

  setLoading = playerState => {
    if (playerState === -1 || playerState === 3) {
      this.setState({ loading: true });
    } else this.setState({ loading: false });
  };

  componentWillReceiveProps(nextProps) {
	if (this.props.allLivecastsInProgress != nextProps.allLivecastsInProgress) {
		let numLivecasts = 0;
		if (nextProps.allLivecastsInProgress.length === 0) {
			//loop through loaded livecasts
			this.setState({nbrLivecastsInProgress: numLivecasts});

		}
		else {
			let tmpLiveShows = [];
			let streamCodesUpdated = false;

			//update the number of livecasts in progress.
			nextProps.allLivecastsInProgress.forEach(livecastInProgress => {
				this.state.liveShows.forEach(loadedLivecast => {
					if (livecastInProgress.LivecastId == loadedLivecast.livecastId) {
						numLivecasts++;

						//make a deep copy of the loaded livecast
						let tmpLoadedLivecast = _.cloneDeep(loadedLivecast);

						//check to see if the stream code is different and needs to be set for the livecast.
						if (loadedLivecast.streamCode != livecastInProgress.StreamCode) {
							tmpLoadedLivecast.streamCode = livecastInProgress.StreamCode;
							streamCodesUpdated = true;

						}

						tmpLiveShows.push(tmpLoadedLivecast);
					}
				});
			});

			if (streamCodesUpdated === true) {
				//the stream codes for the live shows were updated, refresh the state
				this.setState({ liveShows: tmpLiveShows });
			}
		}

		this.setState({	nbrLivecastsInProgress: numLivecasts });
	
   	}
  }

  render() {
    const { onClick, upcomingStarPartyList } = this.props;

    const {
      livecastData,
      isOpen,
      volume,
      playingVideoId,
      liveShows,
      loading,
      displayTitle,
      nbrLivecastsInProgress,
    } = this.state;
    
    return (
     <Fragment>
      <div className="livecast-btn">
         {nbrLivecastsInProgress > 0 && <span
           className={classnames('count', {
              zero: nbrLivecastsInProgress === 0,
           })}
         >
         	<span style={{marginLeft: '5px'}}>&nbsp;</span>
         </span>
        }

        <span
          role="presentation"
          className="icon-volume"
          onClick={() => {
            this.setOpen(!isOpen);
            onClick();
            
          }}
        />

        <YouTube
          onReady={this.onPlayerReady}
          onStateChange={state => this.setLoading(state.data)}
          videoId={playingVideoId}
          opts={YT_OPTIONS}
        />

        {isOpen && (
          <LivecastPopup setOpen={this.setOpen} title={displayTitle} partylist={upcomingStarPartyList}>
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
                  onMute={this.onMute}
                  onUnMute={this.onUnMute}
                />
              ))}
            </>
          </LivecastPopup>
        )}
      </div>
        <style jsx>{`
	      .count {
        	position: absolute;
	        top: 13px;
        	right: 10px;
	        color: ${romance};
        	background-color: red;
	        border-radius: 50%;
        	width: 15px;
	        height: 15px;
        	font-size: 11px;
	      }

	      .zero {
	        background-color: ${astronaut};
        	color: ${romance};
      	      }
	`}
        </style>
     </Fragment>
    );
  }
}
