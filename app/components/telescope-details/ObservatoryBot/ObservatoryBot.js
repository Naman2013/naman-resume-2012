import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import noop from 'lodash/noop';
import cloneDeep from 'lodash/cloneDeep';
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
    messages: [],
    showDescription: true,
  };

  componentDidMount() {
    this.bootstrapSSE();
    setTimeout(() => {
      this.setState({
        showDescription: false,
      });
    }, 10000);
  }

  componentWillReceiveProps(nextProps) {
    const { teleSystem } = this.props;
    if (nextProps.teleSystem !== teleSystem) this.resetSSE();
  }

  componentWillUnmount() {
    this.tearDownSSE();
  }

  bootstrapSSE() {
    const { teleSystem, currentMissionServerTime } = this.props;

    const observatoryBotUrl = `/bot/${teleSystem}`;
    this.sseSource = new EventSource(observatoryBotUrl);
    this.sseSource.addEventListener(
      'initial',
      event => this.handleInitialBotMessages(event.data),
      false
    );

    this.sseSource.addEventListener(
      'message',
      event => this.handleBotMessages(event.data),
      false
    );
  }

  tearDownSSE() {
    this.sseSource.close();
    this.sseSource.removeEventListener(
      'initial',
      this.handleInitialBotMessages,
      false
    );
    this.sseSource.removeEventListener(
      'message',
      this.handleBotMessages,
      false
    );
  }

  resetSSE() {
    this.setState({
      messages: [],
    });
    this.tearDownSSE();
    this.bootstrapSSE();
  }

  handleInitialBotMessages(data) {
    const { viewGroup } = this.props;
    const incomingMessages = JSON.parse(data)[viewGroup];
    incomingMessages.filter(theMessage => theMessage.MessageID !== 'HEARTBEAT');
    this.setState({
      messages: [...incomingMessages],
    });
  }

  handleBotMessages(data) {
    const { viewGroup } = this.props;
    const { messages } = this.state;
    const incomingMessages = JSON.parse(data)[viewGroup];
    incomingMessages.filter(theMessage => theMessage.MessageID !== 'HEARTBEAT');
    this.setState({
      messages: [...messages, ...incomingMessages],
    });
  }

  render() {
    let { messages, showDescription } = this.state;
    const { shortFeed } = this.props;
    const observatoryBotContainerClassnames = classnames(
      'observatorybot-wrapper'
    );
    if (shortFeed) messages = messages.slice(0, 10);
    messages.sort((a, b) => a.serverTime - b.serverTime);
    return (
      <div
        style={{ minHeight: '350px', maxHeight: '350px', overflowY: 'scroll' }}
        className="observatorybot-container"
      >
        {showDescription && (
          <div style={{ padding: '20px' }}>
            <ObservatoryBotDescription displayFlag={showDescription} />
          </div>
        )}
        <div className={observatoryBotContainerClassnames}>
          {messages.map(message => (
            <ObservatoryBotMessage
              key={`${message.Message}-${message.serverTime}`}
              message={message}
            />
          ))}
          {messages && messages.length && (
            <p className="messageCountHeading">{messages.length} Messages:</p>
          )}
          {messages && messages.length && <hr className="messageDivider" />}
        </div>
      </div>
    );
  }
}
