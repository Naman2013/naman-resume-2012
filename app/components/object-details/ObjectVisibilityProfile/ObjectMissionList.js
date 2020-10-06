import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withTranslation } from 'react-i18next';
import Request from 'app/components/common/network/Request';
import { GET_COMMUNITY_MISSIONS_NEW } from 'app/services/objects';
import CenterColumn from '../../../components/common/CenterColumn';

import { ObjectMissionCard } from 'app/modules/object-details/components/object-mission-card';
import { getUserInfo } from 'app/modules/User';
import { API } from 'app/api';

const riseSetModel = {
  name: 'RISE_SET_MODEL',
  model: resp => ({
    obsLabel: resp.obsHeader,
    riseLabel: resp.riseLabel,
    rise: resp.riseText,
    transitLabel: resp.transitLabel,
    transit: resp.transitText,
    setLabel: resp.setLabel,
    set: resp.setText,
    subtitle: resp.dateSelectorDescription,
    title: resp.dateSelectorHeading,
    notesLabel: resp.notesLabel,
    notes: resp.notesText,
    guideHeader: resp.linkHeader,
    guideUrl: resp.linkUrl,
    guideLabel: resp.linkLabel,
    guideSubTitle: resp.linkTitle,
    hasRiseAndSetTimes: resp.hasRiseAndSetTimes,
    riseAndSetSelectors: resp.riseAndSetSelectors,
    obsList: resp.obsList,
    tzHeading: resp.tzSelectorHeading,
    tzDescription: resp.tzSelectorDescription,
    tzList: resp.tzList,
  }),
};
@withTranslation()
class ObjectMissionList extends Component {
 
  state={
    missionData: undefined,
    isFetching: true,
  }

  componentDidMount(){
    this.getCommunityMissions();
  }

  componentWillReceiveProps(nextProps){   
    if(this.props.refreshMissionCard !== nextProps.refreshMissionCard) 
      this.getCommunityMissions();
  }

  getCommunityMissions = () =>{    
    const { dateString, objectId, obsId } = this.props;    
    const { at, cid, token } = getUserInfo();
    this.setState({isFetching: true});    
    API.post(GET_COMMUNITY_MISSIONS_NEW,{ at, cid, token, dateString, objectId, obsId }).then(response=>{
      const res=response.data;
      if(!res.apiError){
        // const timerTime = res.expires - res.timestamp;
        // // this.setState({ missionListExpired: false });
        // if(timerTime > 1000 )
        //   setupCommunityMissionExpireTimer(timerTime, () => this.setState({ missionListExpired: true }) );
        this.setState({missionData: res, isFetching: false});
      }
    })
  }
  
  render() {   

    const { missionListExpired, scheduleMission } = this.props;
    const { isFetching, missionData } =this.state;
    return (
      // <Request        
      //   serviceURL={GET_COMMUNITY_MISSIONS_NEW}
      //   requestBody={{
      //     dateString,
      //     objectId,
      //     obsId,
      //     // tzId,
      //   }}
      //   withoutUser
      //   // model={riseSetModel}
      //   render={({ fetchingContent, serviceResponse}) => {
      //     // const riseSet = RISE_SET_MODEL || {};
        
      //     return (
            <div style={{margin: "20px 0 0 0"}}>
              {!isFetching && missionData && (
                <div>                
                    <CenterColumn>
                      {missionData.missionCount > 0 ? (
                        <div style={{ margin: '0 20px 40px' }}>
                          {missionData.missionList.map(item => (
                            <div
                              className={`mission-card-container${
                                missionListExpired ? ' mission-expired' : ''
                              }`}
                            >
                              <ObjectMissionCard
                                key={item.scheduledMissionId}
                                timeSlot={item}
                                onClickHandler={item.missionAvailable ? () => scheduleMission(item, missionData.callSource) : ()=>{}}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>{!isFetching && missionData.explanation}</div>
                      )}
                    </CenterColumn>                    
                </div>
              )}              
            </div>
          );
    //     }}
    //   />
    // );

    

  }
}

// ObjectVisibilityProfileNew.propTypes = {
//   defaultObsId: PropTypes.string.isRequired,
// };

export default ObjectMissionList;
