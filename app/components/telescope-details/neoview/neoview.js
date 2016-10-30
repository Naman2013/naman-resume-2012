import React, {Component} from 'react';
import Progress from 'react-progressbar';
import styles from './neoview.scss';

/**
  * @todo convert SSE data into "readable" messages once the real data
  * starts coming through
  * @todo figure out proxy post numbers, for now only 3104 and 3105 are handled
*/
export default class Neoview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      latestMassege: null,
      messages: [],
      toggleNeoview: false,
      showToggleOption: this.props.showToggleOption
    }
  }

  componentDidMount() {
    const {port, teleSystem} = this.props;
    const neoUrl = this.generateNeoSource(port, teleSystem);
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
    let messages = this.state.messages
    this.setState({
      latestMassege: data.split('|'),
      //messages: [...messages, data.split('|')]
      messages: [data.split('|'), ...messages]
    })
  }

  generateNeoSource(port, scope) {
    return `/dev-sse/${port}/sse/${scope}`
  }

  /**
    * Handling toggle click of neo view (progress bar arrow)
    * by default the state of neo view is false (hidden)
    * when user clicks arrow the state is being updated which shows/hides neo view overlay
    */
  handleToggleNeoview() {
    this.setState({
      messages: [],
      toggleNeoview: !this.state.toggleNeoview
    });
  }

  render() {
    console.log(this.state)
    return (
      <div className="neoview-container">
        <div className={ `neoview-wrapper ${this.state.toggleNeoview ? 'visible' : 'hidden'}` }>          
          {this.state.messages.map((msg, index) => {
            return <div className="neo-message" key={index}>
              <div className="col-md-4 neo-message-time">{msg[0]}</div>
              <div className="col-md-8 neo-message-text">{msg[1]}</div>
            </div>
          })}

        </div>

      <div className="top">
        <Progress completed={75} color="#589A9A" height="35px" />
        <p className="short">
          LIVE {this.state.latestMassege}
        </p>
        <div className="toggle-description" onClick={this.handleToggleNeoview.bind(this)}>
          {(() => {
            if (this.props.showToggleOption && this.state.toggleNeoview) {
              return <i className="fa fa-angle-down"></i>
            } else {
              return <i className="fa fa-angle-up"></i>
            }
          })()}
        </div>
      </div>

      </div>
    )
  }

}
