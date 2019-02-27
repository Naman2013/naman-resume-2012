import React, { Component } from 'react';
import { Box } from '../box';
import './styles.scss';

export class Telescope extends Component {
  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    const { getObservatoryList } = this.props;
    getObservatoryList();
  };

  render() {
    const { params } = this.props;

    return (
      <div className="by-telescope">
        <div className="container-fluid">
          <Box>
            <div>test</div>
          </Box>
        </div>
      </div>
    );
  }
}
