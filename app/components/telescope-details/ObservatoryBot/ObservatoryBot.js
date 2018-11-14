import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import noop from 'lodash/noop';
import ObservatoryBotDescription from './ObservatoryBotDescription';
import ObservatoryBotMessage from './ObservatoryBotMessage';
import s from './ObservatoryBot.scss';

// TODO: display a timestamp with each message

export default class ObservatoryBot extends Component {
  static propTypes = {
    viewGroup: PropTypes.string,
  };

  static defaultProps = {
    viewGroup: '',
  };

  state = {
    latestMessage: null,
    messages: [],
  }

  componentDidMount() {
    this.bootstrapSSE();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.teleSystem !== this.props.teleSystem) {
      this.resetSSE();
    }
  }

  componentWillUnmount() {
    this.tearDownSSE();
  }

  bootstrapSSE() {
    const { teleSystem, currentMissionServerTime } = this.props;

    const observatoryBotUrl = `https://nova.slooh.com/bot/${teleSystem}`;
    this.sseSource = new EventSource(observatoryBotUrl);
    this.sseSource.addEventListener(
      'initial',
      event => this.handleInitialObservatoryBotMessages(event.data), false);

    this.sseSource.addEventListener(
      'message',
      event => this.handleObservatoryBotMessages(event.data), false);

  }

  tearDownSSE() {
    this.sseSource.close();
    this.sseSource.removeEventListener('initial', this.handleInitialObservatoryBotMessages, false);
    this.sseSource.removeEventListener('message', this.handleObservatoryBotMessages, false);
  }

  resetSSE() {
    this.setState({
      latestMessage: null,
      messages: [],
    });
    this.tearDownSSE();
    this.bootstrapSSE();
  }


  handleInitialObservatoryBotMessages(data) {
    const { viewGroup } = this.props;

    const messages = this.state.messages;
    const message = JSON.parse(data);

    const messagesToProcess = message[viewGroup];
    messagesToProcess.map(theMessage => {
      const notHeartbeat = theMessage.MessageID !== 'HEARTBEAT';

      if (notHeartbeat) {
        const theBotMessage = theMessage.Message.replace("|", "<br/>");
        this.setState({
          latestMessage: theBotMessage,
          messages: [theBotMessage, ...messages],
        });
      }
    });

  }

  handleObservatoryBotMessages(data) {
    const messages = this.state.messages;
    const message = JSON.parse(data);

    const messagesToProcess = message[viewGroup];
    messagesToProcess.map(theMessage => {
      const notHeartbeat = theMessage.MessageID !== 'HEARTBEAT';

      if (notHeartbeat) {
        const theBotMessage = theMessage.Message.replace("|", "<br/>");
        this.setState({
          latestMessage: theBotMessage,
          messages: [theBotMessage, ...messages],
        });
      }
    });
  }


  render() {
    const {
    } = this.props;

    const observatoryBotContainerClassnames = classnames('observatorybot-wrapper');

    return (
      <div
        className="observatorybot-container">
        <div className={observatoryBotContainerClassnames}>
          {
            this.state.messages.map(
              message => <ObservatoryBotMessage key={uniqueId()} message={message} />)
          }
          <ObservatoryBotDescription />
        </div>

        <div className="top">
          <div className={s.progressBarStatus}>
            <p className="short">
              {this.state.latestMessage}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
