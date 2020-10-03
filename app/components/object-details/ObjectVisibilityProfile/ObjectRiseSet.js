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
                    <Row>
                    <StaticCell
                          title={serviceResponse.obsLabel}
                          hasBorderScale={[true]}
                        >
                          <p>
                            {fetchingContent
                              ? `${t('Objects.Loading')}...`
                              : obsName}
                          </p>
                    </StaticCell>
                    </Row>
                      <Row>
                        <StaticCell
                          title={serviceResponse.riseLabel}
                          hasBorderScale={[true]}
                        >
                          <p>
                            {fetchingContent
                              ? `${t('Objects.Loading')}...`
                              : serviceResponse.riseText}
                          </p>
                        </StaticCell>
                        <StaticCell
                          title={serviceResponse.transitLabel}
                          hasBorderScale={[true]}
                        >
                          <p>
                            {fetchingContent
                              ? `${t('Objects.Loading')}...`
                              : serviceResponse.transitText}
                          </p>
                        </StaticCell>
                        <StaticCell
                          title={serviceResponse.setLabel}
                          hasBorderScale={[true]}
                        >
                          <p>
                            {fetchingContent
                              ? `${t('Objects.Loading')}...`
                              : serviceResponse.setText}
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
