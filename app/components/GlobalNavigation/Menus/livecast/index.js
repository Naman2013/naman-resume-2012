// @flow

import React, { PureComponent } from 'react';
import './styles.scss';

type TLivecast = {};

export class Livecast extends PureComponent<TLivecast> {
  componentDidMount = () => {};

  render() {
    // const {  } = this.props;
    return (
      <div className="livecast-btn">
        <span className="icon-volume" />
      </div>
    );
  }
}
