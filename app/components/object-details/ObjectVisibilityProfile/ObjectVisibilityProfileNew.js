import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withTranslation } from 'react-i18next';
import Request from 'app/components/common/network/Request';
import { RISE_SET_TIMES, RISE_SET_TIMES_NEW, GET_JOIN_MISSIONS } from 'app/services/objects';
import { downwardFacingChevron } from 'app/styles/variables/iconURLs';
import ViewOurGuide from '../view-our-guide';
import { GridContainer, Row, StaticCell } from '../../common/grid';
import style from './ObjectVisibilityProfile.style';

import { DEFAULT_OBSID } from './constants';

import  ObjectRiseSet from './ObjectRiseSet';
import ObjectMissionList from './ObjectMissionList';

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
    tzSelection: resp.tzSelection,
  }),
};
@withTranslation()
class ObjectVisibilityProfileNew extends Component {
  static propTypes = {
    objectId: PropTypes.string.isRequired,
  };

  state = {
    obsId: this.props.defaultObsId ? this.props.defaultObsId : DEFAULT_OBSID,
    tzId:  this.props.defaulttzId ? this.props.defaulttzId : undefined,
    activeDateIndex: 0,
  };

  handleObservatoryChange = event => {
    this.setState({ obsId: event.target.value });
  };

  handleTimeZoneChange = event => {
    this.setState({ tzId: event.target.value });
  };

  handleDateSelect = (dateString, index) => {
    this.setState({
      activeDateIndex: index,
      dateString,
    });
  };

  render() {
    const { dateString, obsId, activeDateIndex, tzId } = this.state;

    const { objectId, t, visibilityGuide, scheduleMission } = this.props;
    
    return (
      <Request
        // serviceURL={RISE_SET_TIMES}
        serviceURL={GET_JOIN_MISSIONS}
        requestBody={{
          dateString,
          objectId,          
          tz: tzId,
        }}
        withoutUser
        model={riseSetModel}
        render={({ fetchingContent, modeledResponses: { RISE_SET_MODEL } }) => {
          const riseSet = RISE_SET_MODEL || {};
          return (
            <div>
              {riseSet.riseAndSetSelectors && (
                <div className="obs-visibility-root">
                  <form method="POST">
                  <GridContainer theme={{ margin: '20px 0 0 0' }}>                    
                      <Row wrap>
                        <StaticCell
                          flexScale={['100%', '75%']}
                          hasBorderScale={[true]}
                          titleHtml={riseSet.title}
                        >
                          {riseSet.riseAndSetSelectors &&
                            riseSet.riseAndSetSelectors.dates.map(
                              (date, index) => (
                                <div
                                  key={date.dateString}
                                  role="button"
                                  tabIndex={index + 1}
                                  className={cn('day-sell', {
                                    'is-active': activeDateIndex === index,
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
                              __html: riseSet.subtitle,
                            }}
                          />
                        </StaticCell>
                        
                      </Row>
                      <Row>
                        <StaticCell
                          title={riseSet.tzHeading}
                          hasBorderScale={[true]}
                        >
                          <div className="select-field">
                            <label
                              className="option-label"
                              htmlFor="select-tzId"
                            >
                              <span className="field-value-name">
                                {
                                  // riseSet.tzList.filter((item)=> {return item.obsId==this.state.obsId})[0].obsShortName
                                 
                                    riseSet.tzSelection
                                  
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
                              id="select-tzId"
                              value={riseSet.tzSelection}
                              onChange={this.handleTimeZoneChange}
                            >
                              {/* {Object.entries(
                                riseSet.obsList
                              ) */}
                              {riseSet.tzList.map(obs => (
                                <option value={obs}>{obs}</option>
                              ))}
                            </select>
                          </div>

                          <div
                            className="rise-set-subtitle"
                            dangerouslySetInnerHTML={{
                              __html: riseSet.tzDescription,
                            }}
                          />
                        </StaticCell>

                        
                        

                        <StaticCell
                          title={riseSet.obsLabel}
                          flexScale={['100%', '25%']}
                        >
                          <div className="select-field">
                            <label
                              className="option-label"
                              htmlFor="select-obsId"
                            >
                              <span className="field-value-name">
                                {
                                  riseSet.obsList.filter((item)=> {return item.obsId==this.state.obsId})[0].obsShortName
                                  // riseSet.tzList[
                                  //   this.state.tzList
                                  // ]
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
                              {/* {Object.entries(
                                riseSet.obsList
                              ) */}
                              {riseSet.obsList.map(obs => (
                                <option value={obs.obsId}>{obs.obsShortName}</option>
                              ))}
                            </select>
                          </div>
                        </StaticCell>
                      </Row> 
                    </GridContainer>
                    {riseSet.obsList.map(obs=>(
                      <div>
                        <GridContainer theme={{ margin: '20px 0 0 0' }}>
                          <ObjectRiseSet
                            dateString={riseSet.riseAndSetSelectors.dateString}
                            objectId={objectId}
                            obsId={obs.obsId}
                            tzId={tzId}
                            t={t}
                            obsName={obs.obsShortName}
                          />
                        </GridContainer>                       
                            <ObjectMissionList
                               dateString={riseSet.riseAndSetSelectors.dateString}
                               objectId={objectId}
                               obsId={obs.obsId}
                               tzId={tzId}
                               t={t}
                              scheduleMission={scheduleMission}
                            />                        
                      </div>
                    ))}
                    

                      {/* <Row>
                        <StaticCell
                          title={riseSet.riseLabel}
                          hasBorderScale={[true]}
                        >
                          <p>
                            {fetchingContent
                              ? `${t('Objects.Loading')}...`
                              : riseSet.rise}
                          </p>
                        </StaticCell>
                        <StaticCell
                          title={riseSet.transitLabel}
                          hasBorderScale={[true]}
                        >
                          <p>
                            {fetchingContent
                              ? `${t('Objects.Loading')}...`
                              : riseSet.transit}
                          </p>
                        </StaticCell>
                        <StaticCell
                          title={riseSet.setLabel}
                          hasBorderScale={[true]}
                        >
                          <p>
                            {fetchingContent
                              ? `${t('Objects.Loading')}...`
                              : riseSet.set}
                          </p>
                        </StaticCell>
                      </Row>
                      <Row>
                        <StaticCell title={riseSet.notesLabel}>
                          <p>
                            {fetchingContent
                              ? `${t('Objects.Loading')}...`
                              : riseSet.notes}
                          </p>
                        </StaticCell>
                      </Row> */}
                    </form>
                    {/* </GridContainer> */}
                  {/* <ViewOurGuide
                    guideHeader={riseSet.guideHeader}
                    guideTitle={riseSet.guideLabel}
                    guideUrl={riseSet.guideUrl}
                    guideSubTitle={riseSet.guideSubTitle}
                  /> */}
                </div>
              )}
              <style jsx>{style}</style>
            </div>
          );
        }}
      />
    );

    

  }
}

ObjectVisibilityProfileNew.propTypes = {
  defaultObsId: PropTypes.string.isRequired,
};

export default ObjectVisibilityProfileNew;
