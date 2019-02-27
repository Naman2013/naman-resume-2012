import { Box } from 'app/modules/missions/components/box';
import React, { Component } from 'react';
import './styles.scss';

export class Slooh1000 extends Component {
  componentWillMount = () => {};

  fetchData = () => {};

  render() {
    const { params, children } = this.props;
    return (
      <div className="slooh-1000">
        <div className="container-fluid">
          <div className="col-sm-8">
            <Box>
              <div>test</div>
            </Box>
          </div>
          <div className="col-sm-4">2</div>
        </div>
      </div>
    );
  }
}
