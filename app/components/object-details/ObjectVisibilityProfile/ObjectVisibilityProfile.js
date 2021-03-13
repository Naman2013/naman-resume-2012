import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withTranslation } from 'react-i18next';
import Request from 'app/components/common/network/Request';
import { RISE_SET_TIMES } from 'app/services/objects';
import { downwardFacingChevron } from 'app/styles/variables/iconURLs';
import ViewOurGuide from '../view-our-guide';
import { GridContainer, Row, StaticCell } from '../../common/grid';
import style from './ObjectVisibilityProfile.style';

import { DEFAULT_OBSID } from './constants';
import BestTelescope from '../ObjectProfile/BestTelescope';

const riseSetModel = {
  name: 'RISE_SET_MODEL',
  model: resp => ({
    obsLabel: resp.obsLabel,
    riseLabel: resp.riseLabel,
    rise: resp.riseText,
    transitLabel: resp.transitLabel,
    transit: resp.transitText,
    setLabel: resp.setLabel,
    set: resp.setText,
    subtitle: resp.subtitle,
    title: resp.title,
    notesLabel: resp.notesLabel,
    notes: resp.notesText,
    guideHeader: resp.linkHeader,
    guideUrl: resp.linkUrl,
    guideLabel: resp.linkLabel,
    guideSubTitle: resp.linkTitle,
    hasRiseAndSetTimes: resp.hasRiseAndSetTimes,
    riseAndSetSelectors: resp.riseAndSetSelectors,
  }),
};
@withTranslation()
class ObjectVisibilityProfile extends Component {
  static propTypes = {
    objectId: PropTypes.string.isRequired,
  };

  state = {
    obsId: this.props.defaultObsId ? this.props.defaultObsId : DEFAULT_OBSID,
    activeDateIndex: 0,
  };

  handleObservatoryChange = event => {
    this.setState({ obsId: event.target.value });
  };

  handleDateSelect = (dateString, index) => {
    this.setState({
      activeDateIndex: index,
      dateString,
    });
  };

  render() {
    const { dateString, obsId, activeDateIndex } = this.state;

    const { objectId, t, visibilityGuide, bestTelescope } = this.props;
    
    // return (
    //   <Request
    //     serviceURL={RISE_SET_TIMES}
    //     requestBody={{
    //       dateString,
    //       objectId,
    //       obsId,
    //     }}
    //     withoutUser
    //     model={riseSetModel}
    //     render={({ fetchingContent, modeledResponses: { RISE_SET_MODEL } }) => {
    //       const riseSet = RISE_SET_MODEL || {};
    //       return (
    //         <div>
    //           {riseSet.hasRiseAndSetTimes === true && (
    //             <div className="obs-visibility-root">
    //               <GridContainer theme={{ margin: '20px 0 0 0' }}>
    //                 <form method="POST">
    //                   <Row wrap>
    //                     <StaticCell
    //                       flexScale={['100%', '75%']}
    //                       hasBorderScale={[true]}
    //                       titleHtml={riseSet.title}
    //                     >
    //                       {riseSet.riseAndSetSelectors &&
    //                         riseSet.riseAndSetSelectors.dates.map(
    //                           (date, index) => (
    //                             <div
    //                               key={date.dateString}
    //                               role="button"
    //                               tabIndex={index + 1}
    //                               className={cn('day-sell', {
    //                                 'is-active': activeDateIndex === index,
    //                               })}
    //                               onClick={() =>
    //                                 this.handleDateSelect(
    //                                   date.dateString,
    //                                   index
    //                                 )
    //                               }
    //                             >
    //                               <div
    //                                 className="day-month"
    //                                 dangerouslySetInnerHTML={{
    //                                   __html: date.dateLabel,
    //                                 }}
    //                               />
    //                             </div>
    //                           )
    //                         )}
    //                       <div
    //                         className="rise-set-subtitle"
    //                         dangerouslySetInnerHTML={{
    //                           __html: riseSet.subtitle,
    //                         }}
    //                       />
    //                     </StaticCell>
    //                     <StaticCell
    //                       title={riseSet.obsLabel}
    //                       flexScale={['100%', '25%']}
    //                     >
    //                       <div className="select-field">
    //                         <label
    //                           className="option-label"
    //                           htmlFor="select-obsId"
    //                         >
    //                           <span className="field-value-name">
    //                             {
    //                               riseSet.riseAndSetSelectors.observatories[
    //                                 this.state.obsId
    //                               ]
    //                             }
    //                           </span>
    //                           <img
    //                             alt=""
    //                             width="8"
    //                             src={downwardFacingChevron}
    //                           />
    //                         </label>
    //                         <select
    //                           className="select"
    //                           id="select-obsId"
    //                           value={this.state.obsId}
    //                           onChange={this.handleObservatoryChange}
    //                         >
    //                           {Object.entries(
    //                             riseSet.riseAndSetSelectors.observatories
    //                           ).map(obs => (
    //                             <option value={obs[0]}>{obs[1]}</option>
    //                           ))}
    //                         </select>
    //                       </div>
    //                     </StaticCell>
    //                   </Row>
    //                   <Row>
    //                     <StaticCell
    //                       title={riseSet.riseLabel}
    //                       hasBorderScale={[true]}
    //                     >
    //                       <p>
    //                         {fetchingContent
    //                           ? `${t('Objects.Loading')}...`
    //                           : riseSet.rise}
    //                       </p>
    //                     </StaticCell>
    //                     <StaticCell
    //                       title={riseSet.transitLabel}
    //                       hasBorderScale={[true]}
    //                     >
    //                       <p>
    //                         {fetchingContent
    //                           ? `${t('Objects.Loading')}...`
    //                           : riseSet.transit}
    //                       </p>
    //                     </StaticCell>
    //                     <StaticCell
    //                       title={riseSet.setLabel}
    //                       hasBorderScale={[true]}
    //                     >
    //                       <p>
    //                         {fetchingContent
    //                           ? `${t('Objects.Loading')}...`
    //                           : riseSet.set}
    //                       </p>
    //                     </StaticCell>
    //                   </Row>
    //                   <Row>
    //                     <StaticCell title={riseSet.notesLabel}>
    //                       <p>
    //                         {fetchingContent
    //                           ? `${t('Objects.Loading')}...`
    //                           : riseSet.notes}
    //                       </p>
    //                     </StaticCell>
    //                   </Row>
    //                 </form>
    //               </GridContainer>
    //               <ViewOurGuide
    //                 guideHeader={riseSet.guideHeader}
    //                 guideTitle={riseSet.guideLabel}
    //                 guideUrl={riseSet.guideUrl}
    //                 guideSubTitle={riseSet.guideSubTitle}
    //               />
    //             </div>
    //           )}
    //           <style jsx>{style}</style>
    //         </div>
    //       );
    //     }}
    //   />
    // );

    return (
      <div>
        {visibilityGuide && (
          <GridContainer>
            <Row wrap>             
                <StaticCell
                  flexScale={['100%', '100%', '20%']}
                  hasBorderScale={[true]}
                  displayAtBreakpoints={{
                    screenSmall: false,
                    screenMedium: false,
                    screenLarge: true,
                    screenXLarge: true,
                  }}
                >
                  <ViewOurGuide
                    guideHeader={visibilityGuide.linkHeader}
                    guideTitle={visibilityGuide.linkLabel}
                    guideUrl={visibilityGuide.linkUrl}
                    guideSubTitle={visibilityGuide.linkTitle}
                  />
                </StaticCell>
             

              {bestTelescope.list.length > 0 && (
                <StaticCell
                  flexScale={['100%', '100%', '40%']}
                  title={bestTelescope.label}
                  theme={{ alignSelf: 'flex-start' }}
                  hasBottomBorder={false}
                >
                  <BestTelescope
                    visitLabel={bestTelescope.buttonCaption}
                    telescopes={bestTelescope.list}
                  />
                </StaticCell>
              )}

            </Row>
            
          </GridContainer>
        )}
        <style jsx>{style}</style>
      </div>
    );

  }
}

ObjectVisibilityProfile.propTypes = {
  defaultObsId: PropTypes.string.isRequired,
};

export default ObjectVisibilityProfile;
