import { Box } from 'app/modules/missions/components/box';
import { Slooh1000Setup } from 'app/modules/missions/components/slooh-1000-setup';
import React, { Component } from 'react';
import './styles.scss';

export class Slooh1000 extends Component {
  componentWillMount = () => {
    const { getCategoryList } = this.props;
    getCategoryList();
  };

  render() {
    const { params, children } = this.props;
    return (
      <div className="slooh-1000">
        <div className="container-fluid">
          <div className="col-sm-8">
            <Box>
              <Slooh1000Setup />
            </Box>
          </div>
          <div className="col-sm-4">
            <Box inside>
              <div>2</div>
            </Box>
          </div>
        </div>
      </div>
    );
  }
}
