import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withTranslation } from 'react-i18next';
import Request from 'app/components/common/network/Request';
import { RISE_SET_TIMES, RISE_SET_TIMES_NEW, GET_JOIN_MISSIONS } from 'app/services/objects';
import { downwardFacingChevron } from 'app/styles/variables/iconURLs';
import ViewOurGuide from '../view-our-guide';
import { GridContainer, Row, StaticCell } from '../../common/grid';
import style from './ObjectVisibilityProfileNew.style';

import { DEFAULT_OBSID } from './constants';

import  ObjectRiseSet from './ObjectRiseSet';
import ObjectMissionList from './ObjectMissionList';
import { API } from 'app/api';
import { Spinner } from 'app/components/spinner/index';
import { getUserInfo } from 'app/modules/User';
import { setupCommunityMissionExpireTimer, stopCommunityMissionExpireTimer } from 'app/services/objects/timer';
import ViewOurGuideNew from '../view-our-guide-new';

// const riseSetModel = {
//   name: 'RISE_SET_MODEL',
//   model: resp => ({
//     obsLabel: resp.obsHeader,
//     riseLabel: resp.riseLabel,
//     rise: resp.riseText,
//     transitLabel: resp.transitLabel,
//     transit: resp.transitText,
//     setLabel: resp.setLabel,
//     set: resp.setText,
//     subtitle: resp.dateSelectorDescription,
//     title: resp.dateSelectorHeading,
//     notesLabel: resp.notesLabel,
//     notes: resp.notesText,
//     guideHeader: resp.linkHeader,
//     guideUrl: resp.linkUrl,
//     guideLabel: resp.linkLabel,
//     guideSubTitle: resp.linkTitle,
//     hasRiseAndSetTimes: resp.hasRiseAndSetTimes,
//     riseAndSetSelectors: resp.riseAndSetSelectors,
//     obsList: resp.obsList,
//     tzHeading: resp.tzSelectorHeading,
//     tzDescription: resp.tzSelectorDescription,
//     tzList: resp.tzList,
//     tzSelection: resp.tzSelection,
//     astronomicalTimeGuide: resp.astronomicalTimeGuide,
//     showAstronomicalTimeGuide: resp.showAstronomicalTimeGuide,
//     obsPrompt: resp.obsPrompt,
//   }),
// };

@withTranslation()
class ObjectVisibilityProfileNew extends Component {
  static propTypes = {
    objectId: PropTypes.string.isRequired,
  };

  state = {
    obsId: this.props.defaultObsId ? this.props.defaultObsId : DEFAULT_OBSID,
    tzId:  this.props.defaulttzId ? this.props.defaulttzId : undefined,
    activeDateIndex: 0,
    readMore: false,
    // joinMissionData: undefined,
    // isfetching: true,
  };  

  componentDidMount(){    
    // this.props.getJoinMissions(this.state.dateString, this.state.tzId);
  }

  // componentWillUnmount() {
  //   stopCommunityMissionExpireTimer();
  // }

  // getJoinMissions = () =>{
  //   const { dateString, tzId } = this.state;
  //   const { objectId, onExpired } = this.props;
  //   const { at, cid, token } = getUserInfo();
  //   this.setState({isfetching: true});
  //   stopCommunityMissionExpireTimer();
  //   API.post(GET_JOIN_MISSIONS,{ at, cid, token, dateString, objectId, tz: tzId,}).then(response=>{
  //     const res=response.data;
  //     if(!res.apiError){
  //       const timerTime = res.expires - res.timestamp;
  //       this.setState({ missionListExpired: false });
  //       if(timerTime >1000 )
  //         setupCommunityMissionExpireTimer(timerTime, () => onExpired() );
  //       this.setState({joinMissionData: res, isfetching: false});
  //     }
  //   })
  // }

  handleObservatoryChange = id => {
    // this.setState({ obsId: event.target.value });
    window.scrollTo(0,document.getElementById(id).offsetTop-10);    
  };

  handleTimeZoneChange = event => {
    this.setState({ tzId: event.target.value });
  };

  handleDateSelect = (dateString, index) => {
    this.props.getJoinMissions(dateString, this.state.tzId)

    // this.setState({
    //   activeDateIndex: index,
    //   dateString,
    // },()=>this.props.getJoinMissions(dateString,this.state.tzId));
  };

  render() {
    const { activeDateIndex, tzId, readMore, } = this.state;

    const { objectId, t, scheduleMission, missionListExpired, joinMissionData, isFetching, refreshMissionCard } = this.props;
    
    return (
      // <Request
      //   // serviceURL={RISE_SET_TIMES}
      //   serviceURL={GET_JOIN_MISSIONS}
      //   requestBody={{
      //     dateString,
      //     objectId,          
      //     tz: tzId,
      //   }}
      //   withoutUser
      //   model={riseSetModel}
      //   render={({ fetchingContent, modeledResponses: { RISE_SET_MODEL } }) => {
      //     const riseSet = RISE_SET_MODEL || {};
      //     return (
        
            <div>
              {/* <Spinner loading={isfetching} /> */}
              {joinMissionData && (                       
                    <div className="obs-visibility-root">
                      {/* <form method="POST"> */}
                      <GridContainer theme={{ margin: '20px 0 0 0' }}>                    
                          <Row wrap>
                            <StaticCell
                              flexScale={['100%', '70%']}
                              hasBorderScale={[true]}
                              title={joinMissionData.dateSelectorHeading}
                              titleStyle={{fontSize: "16px"}}
                            >
                              {joinMissionData.riseAndSetSelectors &&
                                joinMissionData.riseAndSetSelectors.dates.map(
                                  (date, index) => (
                                    <div
                                      key={date.dateString}
                                      role="button"
                                      tabIndex={index + 1}
                                      className={cn('day-sell', {
                                        'is-active': joinMissionData.riseAndSetSelectors.dateString === date.dateString,
                                      })}
                                      onClick={() =>
                                        this.handleDateSelect(
                                          date.dateString,
                                          index
                                        )
                                      }
                                    >
                                      <div
                                        className="day-month"
                                        dangerouslySetInnerHTML={{
                                          __html: date.dateLabel,
                                        }}
                                      />
                                    </div>
                                  )
                                )}
                              <div
                                className="rise-set-subtitle"
                                dangerouslySetInnerHTML={{
                                  __html: joinMissionData.dateSelectorDescription,
                                }}
                              />

                          {readMore && (
                            <div>
                              <br/>
                                {/* <Row>
                            <StaticCell                             
                              hasBorderScale={[true]}
                            >
                             

                              <div
                                className="rise-set-subtitle"
                                dangerouslySetInnerHTML={{
                                  __html: joinMissionData.tzSelectorDescription,
                                }}
                              />
                            </StaticCell>
                            
                            {joinMissionData.showAstronomicalTimeGuide && (
                              <StaticCell
                                flexScale={['100%', '25%']}
                              >
                                <div className="obs-visibility-root">
                                  <ViewOurGuideNew
                                    guideHeader={joinMissionData.astronomicalTimeGuide.linkHeader}
                                    guideTitle={joinMissionData.astronomicalTimeGuide.linkLabel}
                                    guideUrl={joinMissionData.astronomicalTimeGuide.linkUrl}
                                    guideSubTitle={joinMissionData.astronomicalTimeGuide.linkTitle}
                                  />
                                </div>
                              </StaticCell>
                            )}
                           
                          </Row>  */}
                          {joinMissionData.showRiseSetTransitSection && (
                            // <Row>
                            //   <StaticCell
                            //     title={joinMissionData.riseSetTransitTitle}
                            //     flexScale={['100%', '30%']}
                            //   >
                                <p dangerouslySetInnerHTML={{__html: joinMissionData.riseSetTransitText}} />
                                
                            //   </StaticCell>
                            // </Row>
                          )}
                            </div>
                          )} 
                          <br/>
                          <div className="read-more" onClick={()=>this.setState({readMore: !readMore})}>
                            <h4>{readMore ? "Read Less" : "Read More..."}</h4>
                          </div>  
                            </StaticCell>
                            <StaticCell
                              title={joinMissionData.obsPrompt}
                              flexScale={['100%', '30%']}
                            >
                              {joinMissionData.obsList.map(obs => (
                                <div className="select-field">
                                  <label
                                    className="option-label"
                                    htmlFor="select-obsId"
                                  >
                                    <span className="field-value-name" onClick={()=>this.handleObservatoryChange(obs.obsId)}>
                                      {obs.obsShortName}
                                    </span>
                                  </label>
                                </div>                               
                                ))}
                                                      


                              {/* <div className="select-field">
                                <label
                                  className="option-label"
                                  htmlFor="select-obsId"
                                >
                                  <span className="field-value-name">
                                    {
                                      joinMissionData.obsList.filter((item)=> {return item.obsId==this.state.obsId})[0].obsShortName
                                    
                                    }
                                  </span>
                                  <img
                                    alt=""
                                    width="8"
                                    src={downwardFacingChevron}
                                  />
                                </label>
                                <select
                                  className="select"
                                  id="select-obsId"
                                  value={this.state.obsId}
                                  onChange={this.handleObservatoryChange}
                                >                           
                                  {joinMissionData.obsList.map(obs => (
                                    <option value={obs.obsId}>{obs.obsShortName}</option>
                                  ))}
                                </select>
                              </div> */}
                            </StaticCell>
                          </Row>
                                                
                          
                        </GridContainer>
                        {joinMissionData.obsList.map(obs=>(
                          <div id={obs.obsId}>
                            {/* <GridContainer theme={{ margin: '20px 0 0 0' }}> */}
                            
                              <ObjectRiseSet
                                dateString={joinMissionData.riseAndSetSelectors.dateString}
                                objectId={objectId}
                                obsId={obs.obsId}
                                tzId={tzId}
                                t={t}
                                obsName={obs.obsShortName}
                              />
                           
                            
                              

                            {/* </GridContainer>                        */}
                                <ObjectMissionList
                                  dateString={joinMissionData.riseAndSetSelectors.dateString}
                                  objectId={objectId}
                                  obsId={obs.obsId}
                                  tzId={tzId}
                                  t={t}
                                  scheduleMission={scheduleMission}
                                  refreshMissionCard={refreshMissionCard}
                                  missionListExpired={missionListExpired}
                                />                        
                          </div>
                        ))}
                        

                          {/* <Row>
                            <StaticCell
                              title={joinMissionData.riseLabel}
                              hasBorderScale={[true]}
                            >
                              <p>
                                {fetchingContent
                                  ? `${t('Objects.Loading')}...`
                                  : joinMissionData.rise}
                              </p>
                            </StaticCell>
                            <StaticCell
                              title={joinMissionData.transitLabel}
                              hasBorderScale={[true]}
                            >
                              <p>
                                {fetchingContent
                                  ? `${t('Objects.Loading')}...`
                                  : joinMissionData.transit}
                              </p>
                            </StaticCell>
                            <StaticCell
                              title={joinMissionData.setLabel}
                              hasBorderScale={[true]}
                            >
                              <p>
                                {fetchingContent
                                  ? `${t('Objects.Loading')}...`
                                  : joinMissionData.set}
                              </p>
                            </StaticCell>
                          </Row>
                          <Row>
                            <StaticCell title={joinMissionData.notesLabel}>
                              <p>
                                {fetchingContent
                                  ? `${t('Objects.Loading')}...`
                                  : joinMissionData.notes}
                              </p>
                            </StaticCell>
                          </Row> */}
                        {/* </form> */}
                        {/* </GridContainer> */}
                      {/* <ViewOurGuide
                        guideHeader={joinMissionData.guideHeader}
                        guideTitle={joinMissionData.guideLabel}
                        guideUrl={joinMissionData.guideUrl}
                        guideSubTitle={joinMissionData.guideSubTitle}
                      /> */}
                    </div>
                  )}                
              <style jsx>{style}</style>
            </div>
          );
    //     }}
    //   />
    // );

    

  }
}

ObjectVisibilityProfileNew.propTypes = {
  defaultObsId: PropTypes.string.isRequired,
};

export default ObjectVisibilityProfileNew;
