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
import Popup from 'react-modal';
import { customModalStylesChartPopupBlueOverlay } from 'app/styles/mixins/utilities';
import { Button } from 'app/modules/new-dashboard/components/button';
import { DEFAULT_OBSID } from './constants';

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
class ObjectRiseSet extends Component {
 
  state = {
    showChartPopup: false,
  }

  render() {   

    const { dateString, objectId, obsId, readMore, tzId, t,  visibilityGuide, obsName } = this.props;
    const { showChartPopup } = this.state;

    return (
      <Request
        // serviceURL={RISE_SET_TIMES}
        serviceURL={RISE_SET_TIMES_NEW}
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
            <div>
              {!fetchingContent && serviceResponse && (
                <div>
                  <br/>
                  <br/>
                    <h1 className="rise-title">{serviceResponse.obsHeading}</h1>
                    <h3 className="rise-subtitle">{serviceResponse.obsSubheading}</h3>
                    <h3 className="rise-visibility-text">{serviceResponse.obsVisibilityMsg}</h3>
                    <GridContainer theme={{ margin: '20px 0 0 0' }}>             
                      <Row>
                      <StaticCell
                            title={serviceResponse.riseSetTransitHeading}
                            hasBorderScale={[true]}                            
                          >                           
                            <p dangerouslySetInnerHTML={{__html: fetchingContent
                                ? `${t('Objects.Loading')}...`
                                : serviceResponse.riseSetTransitDescription}}>
                              {/* {fetchingContent
                                ? `${t('Objects.Loading')}...`
                                : serviceResponse.riseSetTransitDescription} */}
                            </p>
                      </StaticCell>
                      </Row>
                      {/* <Row>
                          <StaticCell
                            theme={{padding: "10px 30px 30px 30px"}}
                            title={serviceResponse.localHorizonPrompt}
                            titleStyle={{marginBottom: "10px"}}
                            hasBorderScale={[true]}
                            flexScale={['100%', '33%']}
                          >
                             <p className="center-label"><span className="local-rise-title">{serviceResponse.riseLabel} </span> {serviceResponse.riseText}</p>
                           
                          </StaticCell>
                          <StaticCell
                            theme={{padding: "10px 30px 30px 30px"}}
                            title={" "}
                            titleStyle={{marginBottom: "20px"}}
                            hasBorderScale={[true]}
                            flexScale={['100%', '33%']}
                          >
                            <p className="center-label"><span className="local-rise-title">{serviceResponse.transitLabel} </span> {serviceResponse.transitText}</p>
                           
                          </StaticCell>
                          <StaticCell
                            theme={{padding: "10px 30px 30px 30px"}}
                            title={" "}
                            titleStyle={{marginBottom: "23px"}}
                            hasBorderScale={[true]}
                            flexScale={['100%', '33%']}
                          >
                            <p className="center-label"><span className="local-rise-title">{serviceResponse.setLabel} </span> {serviceResponse.setText}</p>
                           
                          </StaticCell>
                        </Row> */}
                        <Row>
                          <StaticCell
                            theme={{padding: "10px 30px 30px 30px"}}
                            title={serviceResponse.trueHorizonPrompt}
                            titleStyle={{marginBottom: "10px"}}
                            hasBorderScale={[true]}
                            flexScale={['100%', '33%']}
                          >
                            <p className="center-label"><span className="local-rise-title">{serviceResponse.trueHorizonRiseLabel} </span> {serviceResponse.trueHorizonRiseText}</p>
                            {/* <h2 className="local-rise-title">{serviceResponse.trueHorizonRiseLabel}</h2>
                            <p>
                              {fetchingContent
                                ? `${t('Objects.Loading')}...`
                                : serviceResponse.trueHorizonRiseText}
                            </p> */}
                          </StaticCell>
                          <StaticCell
                            theme={{padding: "10px 30px 30px 30px"}}
                            title={" "}
                            titleStyle={{marginBottom: "23px"}}
                            hasBorderScale={[true]}
                            flexScale={['100%', '33%']}
                          >
                            <p className="center-label"><span className="local-rise-title">{serviceResponse.trueHorizonTransitLabel} </span> {serviceResponse.trueHorizonTransitText}</p>
                            {/* <h2 className="local-rise-title">{serviceResponse.trueHorizonTransitLabel}</h2>
                            <p>
                              {fetchingContent
                                ? `${t('Objects.Loading')}...`
                                : serviceResponse.trueHorizonTransitText}
                            </p> */}
                          </StaticCell>
                          <StaticCell
                            theme={{padding: "10px 30px 30px 30px"}}
                            title={" "}
                            titleStyle={{marginBottom: "23px"}}
                            hasBorderScale={[true]}
                            flexScale={['100%', '33%']}
                          >
                            <p className="center-label"><span className="local-rise-title">{serviceResponse.trueHorizonSetLabel} </span> {serviceResponse.trueHorizonSetText}</p>
                            {/* <h2 className="local-rise-title">{serviceResponse.trueHorizonSetLabel}</h2>
                            <p>
                              {fetchingContent
                                ? `${t('Objects.Loading')}...`
                                : serviceResponse.trueHorizonSetText}
                            </p> */}
                          </StaticCell>
                        </Row>
                        <Row>
                          <StaticCell
                            theme={{padding: "10px 30px 30px 30px"}} 
                            titleStyle={{marginBottom: "10px"}}
                            title={serviceResponse.notesLabel}
                            >
                            <p className="center-label" 
                            dangerouslySetInnerHTML={{__html: fetchingContent
                              ? `${t('Objects.Loading')}...`
                              : serviceResponse.notesText}}                             
                            />
                          </StaticCell>
                        </Row>
                    </GridContainer>                      
                    
                  {/* <ViewOurGuide
                    guideHeader={riseSet.guideHeader}
                    guideTitle={riseSet.guideLabel}
                    guideUrl={riseSet.guideUrl}
                    guideSubTitle={riseSet.guideSubTitle}
                  /> */}
                  {serviceResponse.showTonightChart && (
                    <div className={"visibility-div"}>
                      <img 
                        onClick={()=>this.setState({showChartPopup: true})}
                        className={"enlarge-button"}
                        src={"https://vega.slooh.com/assets/v4/dashboard-new/dock_undock.svg"} 
                      />  
                      <iframe
                        className="chart-div"
                        src={serviceResponse.tonightChart.observatories[0].chartURL}
                      />
                    </div>
                  )}                  
                  <Popup
                    ariaHideApp={false}
                    isOpen={showChartPopup}
                    style={customModalStylesChartPopupBlueOverlay}
                    contentLabel="Chart Popup"
                    shouldCloseOnOverlayClick={false}
                    onRequestClose={()=>this.setState({showChartPopup: false})}
                  >   
                    <div className="new-dash">
                      <div className="profilecard-header">
                        <h2 className="title-heading"></h2> 
                        <Button
                          type={"button"}
                          onClickEvent={()=>this.setState({showChartPopup: false})} 
                          text={"Close"}                                             
                          style={"public-card-close-button"}
                          icon={"https://vega.slooh.com/assets/v4/dashboard-new/close_slooh_blue.svg"}
                        />
                      </div>
                      <br/>
                      <iframe
                        className="chart-div"
                        src={serviceResponse.tonightChart.observatories[0].chartURL}
                      />
                    </div>          
                  </Popup>
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

// ObjectVisibilityProfileNew.propTypes = {
//   defaultObsId: PropTypes.string.isRequired,
// };

export default ObjectRiseSet;
