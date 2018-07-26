/***********************************
* V4 Object Details : Upcoming Missions
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchObjectDetailsAction,
  fetchObjectMissionsAction,
} from '../../modules/object-details/actions';
import DeviceProvider from '../../../app/providers/DeviceProvider';
import ObjectDetailsSectionTitle from '../../components/object-details/ObjectDetailsSectionTitle';
import MissionTile from 'components/common/tiles/MissionTile';
import CenterColumn from '../../../app/components/common/CenterColumn';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectMissions: objectDetails.objectMissions,
  objectDetails: objectDetails.objectDetails,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectDetailsAction,
    fetchObjectMissionsAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Missions extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUpdate(nextProps) {

  }

  componentWillMount() {
    //console.log(this.props)
  }

  render() {
    const {
      params: {
        objectId,
      },
      objectDetails,
      objectMissions,
    } = this.props;


    return (
      <Fragment>
        <DeviceProvider>
          <ObjectDetailsSectionTitle title={objectDetails.objectTitle + "'s"} subTitle="Upcoming Missions" />
        </DeviceProvider>
        <CenterColumn>
          {objectMissions && objectMissions.missionsCount > 0 ? (

            
            <div>
              {Object.keys(objectMissions.missionsList).map(function(key) {
                return(
                  <MissionTile
                    key={'mission_' + key}
                    title={objectMissions.missionsList[key].title}
                    telescope="Canary Three"
                    dat="MON. JAN. 06"
                    thyme="00:00"
                  />
                )})}              
            </div>
            //       <div className="mission-card" key={'card_' + key}>                
            //         <div className="mission-icon"><img src={objectMissions.missionsList[key].iconURL}/></div>
            //         <h4>{objectMissions.missionsList[key].title}</h4>
            //         {objectDetails.objectSubtitle}
            //         <ul>
            //           {Object.keys(objectMissions.missionsList[key].missionDetails).map(function(indx) {
            //             return( 
            //               <li key={indx}><img src={objectMissions.missionsList[key].missionDetails[indx].itemiconURL}/>{objectMissions.missionsList[key].missionDetails[indx].itemText}</li>
            //             )
            //           })}
            //         </ul>
            //         {objectMissions.missionsList[key].canJoinFlag &&                 
            //           <div className="mission-btn">{objectMissions.missionsList[key].joinPrompt}</div>
            //         }
            //       </div>
            //     )
            //   })}
            // </div>
          ) : (
            <div>
              Sorry, there are no mission available for {objectDetails.objectTitle} at this time.
            </div>
          )}
        </CenterColumn>
      </Fragment>
    )
  }
}
export default Missions;

