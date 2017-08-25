import React, { Component } from 'react';
import Progress from 'react-progressbar';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import NeoViewDescription from './NeoViewDescription';
import NewViewMessage from './NeoViewMessage';
import s from './neoview.scss';

// √ TODO: handle messages flowing up and out of the viewer...
// √ TODO: handle the appropriate positioning and display of the neoviews core container
// TODO: display a timestamp with each message
// √ TODO: make the neoview message color gold per the design
// √ TODO: separate the about message into its own component
// √ TODO: prepend the neoview description to the feed state

export default class Neoview extends Component {

  state = {
    latestMessage: null,
    messages: [],
    toggleNeoview: false,
  }

  componentDidMount() {
    const { port, teleSystem, currentMissionServerTime } = this.props;

    const neoUrl = `/sselog/${teleSystem}`;
    this.sseSource = new EventSource(neoUrl);
    this.sseSource.addEventListener(
      'message',
      event => this.handleNeoMessages(event.data), false
    )
  }

  componentWillUnmount() {
    this.sseSource.close();
    this.sseSource.removeEventListener('message', this.handleNeoMessages, false);
  }

  handleNeoMessages(data) {
    const messages = this.state.messages;
    const message = JSON.parse(data);
    const notHeartbeat = message.messageType !== 'HEARTBEAT';

    if (notHeartbeat) {
      this.setState({
        latestMessage: message.logMessage,
        messages: [message.logMessage, ...messages],
      });
    }
  }

  /**
    * Handling toggle click of neo view (progress bar arrow)
    * by default the state of neo view is false (hidden)
    * when user clicks arrow the state is being updated which shows/hides neo view overlay
    * we prepend the most recent message and the neoview description
    */
  handleToggleNeoview = () => {
    this.setState(prevState => ({
      messages: [prevState.latestMessage],
      toggleNeoview: !prevState.toggleNeoview,
    }));
  }

  render() {
    const { percentageMissionTimeRemaining } = this.props;
    const neoviewContainerClassnames = classnames('neoview-wrapper', {
      visible: this.state.toggleNeoview,
      hidden: !this.state.toggleNeoview,
    });

    return (
      <div className="neoview-container">

        <div className={neoviewContainerClassnames}>
          {
            this.state.messages.map(message => <NewViewMessage key={uniqueId()} message={message} />)
          }
          <NeoViewDescription />
        </div>

        <div className="top">
          <Progress completed={percentageMissionTimeRemaining} color="#589A9A" height="35px" />
          <div className={s.progressBarStatus}>
            <p className="short">
              {this.state.latestMessage}
            </p>

            {
              this.props.showToggleOption &&
                <button className="toggle-description" onClick={this.handleToggleNeoview}>
                  {
                    this.state.toggleNeoview ?
                      <i className="fa fa-angle-down" /> : <i className="fa fa-angle-up" />
                  }
                </button>
            }
          </div>
        </div>
      </div>
    )
  }
}
