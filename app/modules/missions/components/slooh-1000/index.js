import { Box } from 'app/modules/missions/components/box';
import { Slooh1000Setup } from 'app/modules/missions/components/slooh-1000-setup';
import React, { Component } from 'react';
import './styles.scss';

export class Slooh1000 extends Component {
  componentDidMount = () => {
    const { getCategoryList } = this.props;
    getCategoryList();
  };

  render() {
    const { categoryListOpts, setCategory } = this.props;
    return (
      <div className="slooh-1000">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-8">
              <Box>
                <Slooh1000Setup
                  categoryListOpts={categoryListOpts}
                  setCategory={setCategory}
                />
              </Box>
            </div>
            <div className="col-sm-4">
              <Box inside>
                <div>YOUR MISSION WILL APPEAR HERE</div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
