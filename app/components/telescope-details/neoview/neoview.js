import React, {Component} from 'react';
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
      messages: []
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
      messages: [...messages, data.split('|')]
    })
  }

  generateNeoSource(port, scope) {
    return `/dev-sse/${port}/sse/${scope}`
  }

  render() {
    console.log(this.state)
    return (
      <div className={ `neoview-wrapper ${this.props.className}` }>
        What is this? Slooh telescopes move through a complex process of taking long exposures through
        various filters, ultimate combining that mathematical data into one image. Ever see The Matrix? Think of this as the “Neo View” as the exposure is being processed.

        {this.state.messages.map((msg, index) => {
          return <div key={index}>
            <div className="col-md-4 neo-message-time">{msg[0]}</div>
            <div className="col-md-8 neo-message-text">{msg[1]}</div>
          </div>
        })}

      </div>
    )
  }

}
