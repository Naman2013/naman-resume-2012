import React, {Component} from 'react';
import styles from './neoview.scss';

export default class Neoview extends React.Component {

  componentDidMount() {
    const {port, teleSystem} = this.props;
    const neoUrl = this.generateNeoSource(port, teleSystem);
    this.sseSource = new EventSource(neoUrl);
    this.sseSource.addEventListener(
      'message',
      event => this.handleNeoMessages(event), false
    )
  }

  componentWillUnmount() {
    this.sseSource.close();
    this.sseSource.removeEventListener('message', this.handleNeoMessages, false);
  }

  handleNeoMessages(data) {
    console.log(data);
  }

  generateNeoSource(port, scope) {
    return `/dev-sse/${port}/sse/${scope}`
  }

  generateMessages() {

  }

  render() {

    return (
      <div className={ `neoview-wrapper ${this.props.className}` }>
        What is this? Slooh telescopes move through a complex process of taking long exposures through
        various filters, ultimate combining that mathematical data into one image. Ever see The Matrix? Think of this as the “Neo View” as the exposure is being processed.

        01:02:03  Initiating photon collection onto the sensor…<br/>
        01:02:08  Red filter exposure in progress…<br/>
        02:05:12  Writing Red filter exposure to server…<br/>
        02:12:22  Green filter exposure in progress…<br/>
        02:12:22  Hammering together various exposures to make the image<br/>
        02:12:22  Layering together various exposures to make the image<br/>
        01:02:03  Initiating photon collection onto the sensor…<br/>
        01:02:08  Red filter exposure in progress…<br/>
        02:05:12  Writing Red filter exposure to server…<br/>
        02:12:22  Green filter exposure in progress…<br/>
        02:12:22  Hammering together various exposures to make the image<br/>
        02:12:22  Layering together various exposures to make the image<br/>
        02:12:22  Initiating next command…<br/>
      </div>
    )
  }

}
