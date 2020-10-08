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
 
  render() {   

    const { dateString, objectId, obsId, tzId, t,  visibilityGuide, obsName } = this.props;
    
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
                      <Row>
                          <StaticCell
                            title={serviceResponse.localHorizonPrompt}
                            hasBorderScale={[true]}
                            flexScale={['100%', '33%']}
                          >
                            <h2 className="local-rise-title">{serviceResponse.riseLabel}</h2>
                            <p>
                              {fetchingContent
                                ? `${t('Objects.Loading')}...`
                                : serviceResponse.riseText}
                            </p>
                          </StaticCell>
                          <StaticCell
                            title={" "}
                            hasBorderScale={[true]}
                            flexScale={['100%', '33%']}
                          >
                            <h2 className="local-rise-title">{serviceResponse.transitLabel}</h2>
                            <p>
                              {fetchingContent
                                ? `${t('Objects.Loading')}...`
                                : serviceResponse.transitText}
                            </p>
                          </StaticCell>
                          <StaticCell
                            title={" "}
                            hasBorderScale={[true]}
                            flexScale={['100%', '33%']}
                          >
                            <h2 className="local-rise-title">{serviceResponse.setLabel}</h2>
                            <p>
                              {fetchingContent
                                ? `${t('Objects.Loading')}...`
                                : serviceResponse.setText}
                            </p>
                          </StaticCell>
                        </Row>
                        <Row>
                          <StaticCell
                            title={serviceResponse.trueHorizonPrompt}
                            hasBorderScale={[true]}
                            flexScale={['100%', '33%']}
                          >
                            <h2 className="local-rise-title">{serviceResponse.trueHorizonRiseLabel}</h2>
                            <p>
                              {fetchingContent
                                ? `${t('Objects.Loading')}...`
                                : serviceResponse.trueHorizonRiseText}
                            </p>
                          </StaticCell>
                          <StaticCell
                            title={" "}
                            hasBorderScale={[true]}
                            flexScale={['100%', '33%']}
                          >
                            <h2 className="local-rise-title">{serviceResponse.trueHorizonTransitLabel}</h2>
                            <p>
                              {fetchingContent
                                ? `${t('Objects.Loading')}...`
                                : serviceResponse.trueHorizonTransitText}
                            </p>
                          </StaticCell>
                          <StaticCell
                            title={" "}
                            hasBorderScale={[true]}
                            flexScale={['100%', '33%']}
                          >
                            <h2 className="local-rise-title">{serviceResponse.trueHorizonSetLabel}</h2>
                            <p>
                              {fetchingContent
                                ? `${t('Objects.Loading')}...`
                                : serviceResponse.trueHorizonSetText}
                            </p>
                          </StaticCell>
                        </Row>
                        <Row>
                          <StaticCell title={serviceResponse.notesLabel}>
                            <p>
                              {fetchingContent
                                ? `${t('Objects.Loading')}...`
                                : serviceResponse.notesText}
                            </p>
                          </StaticCell>
                        </Row>
                    </GridContainer>   
                    
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

// ObjectVisibilityProfileNew.propTypes = {
//   defaultObsId: PropTypes.string.isRequired,
// };

export default ObjectRiseSet;
