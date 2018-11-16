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

  constructor(props) {
    super(props);
  }

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
      event => this.handleInitialBotMessages(event.data), false);

    this.sseSource.addEventListener(
      'message',
      event => this.handleBotMessage(event.data), false);
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


  handleInitialBotMessages(data) {
    const { viewGroup } = this.props;

    const message = JSON.parse(data);
    const messagesToProcess = message[viewGroup];

    let latestMessage = '';
    let theMessages = [ ];

    messagesToProcess.map(theMessage => {
      const notHeartbeat = theMessage.MessageID !== 'HEARTBEAT';

      if (notHeartbeat) {
        const theBotMessage = theMessage.Message.replace("|", "<br/>");
        theMessages.push(theBotMessage);
      }
    });

    this.setState({
      latestMessage: latestMessage,
      messages: [...theMessages],
    });
  }

  handleBotMessage(data) {
    const { viewGroup } = this.props;

    const existingMessages = this.state.messages;
    const message = JSON.parse(data);

    let latestMessage = '';

    if (message.ViewGroup == viewGroup) {
      const notHeartbeat = message.MessageID !== 'HEARTBEAT';

      if (notHeartbeat) {
        const theBotMessage = message.Message.replace("|", "<br/>");
        latestMessage = theBotMessage;
      }

      this.setState({
        latestMessage: latestMessage,
        messages: [latestMessage, ...existingMessages],
      });
    }
  }

  render() {
    const {
    } = this.props;

    const observatoryBotContainerClassnames = classnames('observatorybot-wrapper');

    return (
      <div
        style={{'border': '1px dashed', 'maxHeight': '300px', 'overflowY': 'scroll'}}
        className="observatorybot-container">
        <div><ObservatoryBotDescription/></div>
        <div className={observatoryBotContainerClassnames}>
          {
            this.state.messages.map(message => <ObservatoryBotMessage key={uniqueId()} message={message} />)
          }
          <ObservatoryBotMessage key={uniqueId()} message={this.state.latestMessage} />
        </div>
      </div>
    );
  }
}
