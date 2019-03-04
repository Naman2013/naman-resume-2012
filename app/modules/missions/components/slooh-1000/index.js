import { Box } from 'app/modules/missions/components/box';
import { Slooh1000Setup } from 'app/modules/missions/components/slooh-1000-setup';
import React, { Component } from 'react';
import './styles.scss';

export class Slooh1000 extends Component {
  componentDidMount = () => {
    const { getCategoryList, getBySlooh1000 } = this.props;
    //getBySlooh1000(); will be soon
    getCategoryList();
  };

  getMissionSlot = () => {
    const { getMissionSlot, selectedObjectSlug, objectList } = this.props;
    const selectedObject = objectList.filter(
      item => item.topicSlug === selectedObjectSlug
    );

    getMissionSlot({
      callSource: 'byPopularObjects',
      domeId: selectedObject[0].domeId,
      missionStart: selectedObject[0].missionStart,
      objectId: selectedObject[0].objectId,
      objectTitle: selectedObject[0].objectTitle,
      objectType: selectedObject[0].objectType,
      obsId: selectedObject[0].obsId,
      scheduledMissionId: selectedObject[0].scheduledMissionId,
      telescopeId: selectedObject[0].telescopeId,
    });
  };

  render() {
    const {
      categoryListOpts,
      setCategory,
      objectListOpts,
      setObject,
    } = this.props;
    console.log(this.props);
    return (
      <div className="slooh-1000">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <Box>
                <Slooh1000Setup
                  categoryListOpts={categoryListOpts}
                  objectListOpts={objectListOpts}
                  setCategory={setCategory}
                  setObject={setObject}
                  getMissionSlot={this.getMissionSlot}
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
