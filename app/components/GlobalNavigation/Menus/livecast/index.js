// @flow

import { LivecastPopup } from 'app/components/GlobalNavigation/Menus/livecast/popup';
import axios from 'axios';
import React, { PureComponent } from 'react';
import './styles.scss';

type TLivecast = {};

type TLiveShowData = {
  description: string,
  endTime: string,
  hostName: string,
  startTime: string,
  streamCode: string,
  title: string,
};

type TLivecastData = {
  LiveShowData: TLiveShowData,
  UpcommingShowData: Array<any>,
  apiError: boolean,
  displayTitle: string,
  errorCode: number,
  errorMsg: string,
  isLive: boolean,
  lang: string,
  statusCode: number,
  ver: string,
};

type TState = {
  livecastData: TLivecastData,
  isOpen: boolean,
};

export class Livecast extends PureComponent<TLivecast, TState> {
  state = {
    livecastData: {},
    isOpen: false,
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

  render() {
    const { livecastData, isOpen } = this.state;
    const { LiveShowData = {} } = livecastData;
    const { streamCode } = LiveShowData;

    console.log(livecastData);

    return (
      <div className="livecast-btn">
        <span
          role="presentation"
          className="icon-volume"
          onClick={() => this.setOpen(true)}
        />

        {/*{streamCode && <AudioPlayer isLiveEvent streamCode={streamCode} />}*/}

        {isOpen && <LivecastPopup setOpen={this.setOpen} />}
      </div>
    );
  }
}
