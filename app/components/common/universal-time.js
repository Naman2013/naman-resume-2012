import React, {Component, Props} from 'react';
import moment from 'moment';
import styles from './common.scss';

class UniversalTime extends Component {

  componentWillMount() {
    this.setState({time: moment.utc().format('HH:mm:ss')});
  }

  componentDidMount() {
    let intervalCounter = setInterval(this.timer.bind(this), 1000);
    this.setState({intervalCounter});
  }

  timer() {    
    this.setState({time: moment.utc().format('HH:mm:ss')});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalCounter);
  }

  render() {
    let className = `${styles.universalTime} ${this.props.extraClass || ''}`;
    return (
      <div className={className}>
        <span className="light-gray">Universal Time: </span>
        <span className="time"><b>{this.state.time}</b></span>
        <br />
        <a className="time-action" href="#">What is UTC?</a>
      </div>
    )
  }
};

export default UniversalTime;
