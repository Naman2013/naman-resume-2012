import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withTranslation } from 'react-i18next';
import Request from 'app/components/common/network/Request';
import { GET_COMMUNITY_MISSIONS_NEW } from 'app/services/objects';
import { downwardFacingChevron } from 'app/styles/variables/iconURLs';
import ViewOurGuide from '../view-our-guide';
import { GridContainer, Row, StaticCell } from '../../common/grid';
import style from './ObjectVisibilityProfile.style';
import CenterColumn from '../../../components/common/CenterColumn';
import { DEFAULT_OBSID } from './constants';
import Button1 from 'app/components/common/style/buttons/Button';
import { customModalStylesBlackOverlay } from 'app/styles/mixins/utilities';
import Popup from 'react-modal';
import { AccountDetailsHeader } from 'app/modules/account-settings/components/account-details/header';
import { FeaturedObjectsModal } from 'app/modules/telescope/components/featured-objects-modal';
import { MissionSuccessModal } from 'app/modules/missions/components/mission-success-modal';
import { MissionCard } from '../../../modules/object-details/components/mission-card';

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
 
  
  render() {   

    const { dateString, objectId, obsId, tzId, t,  visibilityGuide, scheduleMission } = this.props;
    
    return (
      <Request        
        serviceURL={GET_COMMUNITY_MISSIONS_NEW}
        requestBody={{
          dateString,
          objectId,
          obsId,
          // tzId,
        }}
        withoutUser
        // model={riseSetModel}
        render={({ fetchingContent, serviceResponse}) => {
          // const riseSet = RISE_SET_MODEL || {};
          
          return (
            <div style={{margin: "20px 0 0 0"}}>
              {!fetchingContent && serviceResponse && (
                <div>                
                    <CenterColumn>
                      {serviceResponse.missionCount > 0 ? (
                        <div style={{ margin: '0 20px 40px' }}>
                          {serviceResponse.missionList.map(item => (
                            <div
                              className={`mission-card-container${
                                serviceResponse.missionListExpired ? ' mission-expired' : ''
                              }`}
                            >
                              <MissionCard
                                key={item.scheduledMissionId}
                                timeSlot={item}
                                onClickHandler={item.missionAvailable ? () => scheduleMission(item) : null}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>{!fetchingContent && serviceResponse.explanation}</div>
                      )}
                    </CenterColumn>                    
                </div>
              )}              
            </div>
          );
        }}
      />
    );

    

  }
}

// ObjectVisibilityProfileNew.propTypes = {
//   defaultObsId: PropTypes.string.isRequired,
// };

export default ObjectMissionList;
