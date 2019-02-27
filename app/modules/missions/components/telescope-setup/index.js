import React, { Component } from 'react';
import { Box } from '../box';
import './styles.scss';

export class TelescopeSetup extends Component {
  componentDidMount = () => {};

  fetchData = () => {
    const { getObservatoryList } = this.props;
    getObservatoryList();
  };

  render() {
    const { params } = this.props;

    return <div>test</div>;
  }
}
