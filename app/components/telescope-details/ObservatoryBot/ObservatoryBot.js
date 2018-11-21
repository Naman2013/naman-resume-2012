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

    const observatoryBotUrl = `/bot/${teleSystem}`;
    this.sseSource = new EventSource(observatoryBotUrl);
    this.sseSource.addEventListener(
      'initial',
      event => this.handleInitialBotMessages(event.data), false);

    this.sseSource.addEventListener(
      'message',
      event => this.handleBotMessages(event.data), false);
  }

  tearDownSSE() {
    this.sseSource.close();
    this.sseSource.removeEventListener('initial', this.handleInitialBotMessages, false);
    this.sseSource.removeEventListener('message', this.handleBotMessages, false);
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

    const incomingMessages = JSON.parse(data)[viewGroup];

    let latestMessage = '';
    let theMessages = [ ];

    //check to see if there are any valid messages (not heartbeat)
    let hasValidMessages = false;
    incomingMessages.map(theMessage => {

      const notHeartbeat = theMessage.MessageID !== 'HEARTBEAT';

      if (notHeartbeat) {
        hasValidMessages = true;
      }
    });

    if (hasValidMessages === true) {
      theMessages.unshift('<hr size="1" width="100%"/>');
    }

    incomingMessages.map(theMessage => {
      const notHeartbeat = theMessage.MessageID !== 'HEARTBEAT';

      if (notHeartbeat) {
        const theBotMessage = theMessage.DTG + "<br/>" + theMessage.Message;
        //const theBotMessage = theMessage.Message;
        theMessages.unshift(theBotMessage);
      }
    });

    this.setState({
      messages: [...theMessages],
    });
  }

  handleBotMessages(data) {
    const { viewGroup } = this.props;

    const incomingMessages = JSON.parse(data)[viewGroup];

    let latestMessage = '';
    let theMessages = [ ];

    //check to see if there are any valid messages (not heartbeat)
    let hasValidMessages = false;
    incomingMessages.map(theMessage => {
      const notHeartbeat = theMessage.MessageID !== 'HEARTBEAT';

      if (notHeartbeat) {
        hasValidMessages = true;
      }
    });

    incomingMessages.map(theMessage => {
      const notHeartbeat = theMessage.MessageID !== 'HEARTBEAT';

      if (notHeartbeat) {
        const theBotMessage = theMessage.DTG + "<br/>" + theMessage.Message;
        //const theBotMessage = theMessage.Message;
        theMessages.push(theBotMessage);
      }
    });

    if (hasValidMessages === true) {
      theMessages.push('<hr className="messageDivider" width="100%"/>');
    }

    this.setState({
      messages: [...this.state.messages, ...theMessages],
    });
  }

  render() {
    const {
    } = this.props;

    const observatoryBotContainerClassnames = classnames('observatorybot-wrapper');

    return (
      <div
        style={{'maxHeight': '500px', 'overflowY': 'scroll'}}
        className="observatorybot-container">
        <div style={{'padding': '10px'}}><ObservatoryBotDescription/></div>
        <div className={observatoryBotContainerClassnames}>
          {
            this.state.messages.map(message => <ObservatoryBotMessage key={message} message={message} />)
          }
          {this.state.messages.length > 0 && <p className="messageCountHeading">{this.state.messages.length} Messages:</p>}
          {this.state.messages.length > 0 && <hr className="messageDivider" width="100%"/>}
        </div>
      </div>
    );
  }
}
