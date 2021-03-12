/** *********************************
 * V4 Object Details Overview
 *   Markdown support on elements????
 *   UTF-8 support....
 *   Multi-National Languages.....
 ********************************** */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { BURNHAMS_CORNER_CONTENT } from 'app/services/content';
import CenterColumn from 'app/components/common/CenterColumn';
import TopicContent from 'app/components/guides/TopicContent';
import Request from 'app/components/common/network/Request';
import DeviceProvider from 'app/providers/DeviceProvider';
import CardObservations from 'app/components/common/CardObservations';
import SterlingTitle from 'app/components/common/titles/SterlingTitle';
import BurnhamsCorner from 'app/components/common/BurnhamsCorner';
import ObjectProfile from 'app/components/object-details/ObjectProfile';
import ObjectVisibilityProfile from 'app/components/object-details/ObjectVisibilityProfile';
import ObjectHowBig from 'app/components/object-details/ObjectHowBig';
import LailaTile from 'app/components/common/tiles/LailaTile';
import GuideTile from 'app/components/common/tiles/guide-tile';
import GenericButton from 'app/components/common/style/buttons/Button';
import MVPAstronomer from 'app/components/common/MVPAstronomer/MVPAstronomer';
import { ObservationCard } from 'app/modules/observations/components/observation-card';
import {
  fetchObjectDataAction,
  fetchObjectSpecialistsAction,
  fetchLikeAction,
} from 'app/modules/object-details/actions';

import style from './ObjectDetailsOverview.style';
import ObjectRelatedTile from './ObjectRelatedTile';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectData: objectDetails.objectData,
  objectSpecialists: objectDetails.objectSpecialists,
  imageDetails: objectDetails.imageDetails,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchObjectDataAction,
      fetchObjectSpecialistsAction,
      fetchLikeAction,
    },
    dispatch
  ),
});

const burnhamsModel = {
  name: 'BURNHAMS_CORNER',
  model: resp => ({
    title: resp.title,
    subTitle: resp.subTitle,
    burnhamTileContent: {
      objectTitle: resp.objectTitle,
      content: resp.content,
      imageURL: resp.imageURL,
      hasLink: resp.hasLink,
      linkLabel: resp.linkLabel,
      linkURL: resp.linkURL,
    },
  }),
};

const modelData = resp => ({
  topicContentProps: {
    title: resp.objectTitle,
    topicContentList: Object.values(resp.pointsList.list),
    topicIconList: Object.values(resp.pointsList.iconList),
    aboutTitle: resp.objectSubtitle,
    aboutContent: resp.objectDescription,
    showContentList: resp.showBulletPoints,
    topicActionProps: {
      showActions: resp.showFollowPromptFlag,
      followButtonText: resp.followPrompt,
      followButtonIconURL: resp.followPromptIconUrl,
      followActionIconUrl: resp.followActionIconUrl,
      toggleFollowConfirmationFlag: resp.toggleFollowConfirmationFlag,
      toggleFollowConfirmationPrompt: resp.toggleFollowConfirmationPrompt,
    },
  },
  statisticsTitle: {
    title: resp.objectSubtitle,
    subTitle: resp.objectTagline,
  },
  featuredObservation: {
    customerImageId: resp.featuredObservation.customerImageId,
  },
  objectDetails: {
    nameLabel: resp.displayNameLabel,
    coordinatesLabel: resp.objectCoordinatesLabel,
    сoordinates: resp.objectCoordinatesDisplay,
    magnitudeLabel: resp.objectMagnitudeLabel,
    magnitude: resp.objectMagnitude,
    apparentAngularSizeLabel: resp.objectSizeArcSecondsLabel,
    apparentAngularSizeText: resp.objectSizeArcSecondsDisplay,
    panelHeading1: resp.panelHeading1,
    panelHeading2: resp.panelHeading2,
  },
  visibilitySeason: {
    show: resp.showVisibilitySeason,
    title: resp.visibilitySeason.label,
    observatories: resp.visibilitySeason.observatories.map(obs => (
      <p key={`visibility-season-${obs.label}-${obs.text}`}>
        {obs.label} {obs.text}
      </p>
    )),
  },
  midnight12MonthChart:{
    observatories: resp.midnight12MonthChart.observatories
  },
  midnightCulmination: {
    show: resp.showMidnightCulmination,
    label: resp.midnightCulmination.label,
    text: resp.midnightCulmination.text,
    description: resp.midnightCulmination.description,
  },
  bestTelescope: {
    label: resp.bestTelescopes.listTitle,
    visitTelescopeLabel: resp.visitTelescopeCaption,
    list: resp.bestTelescopes.list,
  },
  relatedObject: {
    show: resp.hasRelatedObject,
    ...resp.relatedObject,
  },
  relatedStory: {
    show: resp.hasRelatedStory,
    ...resp.relatedStory,
  },
  relatedShow: {
    show: resp.hasRelatedShow,
    ...resp.relatedShow,
  },
  relatedGuide: {
    show: resp.hasRelatedGuide,
    ...resp.relatedGuide,
  },
  hasHowBigData: resp.hasHowBigData,
  hasFeaturedObservation: resp.hasFeaturedObservation,
});

const obsData = resp => ({
  ...resp,
  title: resp.imageTitle,
  subTitle: resp.displayName,
  desc: resp.observationLog,
  imageURL: resp.imageURL,
  linkUrl: resp.linkUrl,
  likesCount: resp.likesCount,
  likePrompt: resp.likePrompt,
  timeDisplay: resp.observationTimeDisplay,
  showLikePrompt: resp.showLikePrompt,
  commentsCount: resp.commentsCount,
  iconFileData: resp.iconFileData,
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withTranslation()
class Overview extends Component {
  navigateByURl = url => {
    browserHistory.push(url);
  };

  render() {
    const {
      params: { objectId },
      objectData,
      objectSpecialists,
      imageDetails,
      t,
      user,
      actions: { fetchLikeAction },
    } = this.props;

    const modeledResult = modelData(objectData);
    const observation = obsData(imageDetails);

    // TODO: need something more substantial than this to prevent bad renders
    if (!modeledResult.topicContentProps.title) {
      return null;
    }
    
    return (
      <Fragment>
        <TopicContent
          {...modeledResult.topicContentProps}
          objectId={objectId}
          user={user}
        />

        {modeledResult.hasFeaturedObservation && (
          <section className="blue-tile-bg">
            <DeviceProvider>
              <SterlingTitle
                title="Most Recent Observation"
                theme={{
                  title: { color: 'white' },
                  subTitle: { color: 'white' },
                }}
              />
              <CenterColumn widths={['768px', '965px', '965px']}>
                {observation.linkUrl && (
                  <ObservationCard
                    observationData={observation}
                    handleLike={fetchLikeAction}
                  />
                )}
              </CenterColumn>
            </DeviceProvider>
          </section>
        )}

        <section className="off-white-bg">
          <SterlingTitle {...modeledResult.statisticsTitle} />
          <CenterColumn widths={['768px', '965px', '965px']}>
            <ObjectProfile
              scienceName={objectData.objectTitle}
              objectSpecs={modeledResult.objectDetails}
              visibilitySeason={{
                show: modeledResult.visibilitySeason.show,
                title: modeledResult.visibilitySeason.title,
                observatories: modeledResult.visibilitySeason.observatories,
                showVisibilitySeason: modeledResult.showVisibilitySeason,
              }}
              midnightCulmination={{
                show: modeledResult.midnightCulmination.show,
                label: modeledResult.midnightCulmination.label,
                text: modeledResult.midnightCulmination.text,
                description: modeledResult.midnightCulmination.description,
                showMidnightCulmination: modeledResult.showMidnightCulmination,
              }}
              // bestTelescope={{
              //   label: modeledResult.bestTelescope.label,
              //   list: modeledResult.bestTelescope.list,
              //   buttonCaption: modeledResult.bestTelescope.visitTelescopeLabel,
              // }}
              midnight12MonthChart={modeledResult.midnight12MonthChart}
              showMidnight12MonthChart={modeledResult.showMidnight12MonthChart}
            />

            <ObjectVisibilityProfile
              defaultObsId={objectData.obsIdDefault}
              objectId={objectId}
              visibilityGuide={objectData.visibilityGuide}
              bestTelescope={{
                label: modeledResult.bestTelescope.label,
                list: modeledResult.bestTelescope.list,
                buttonCaption: modeledResult.bestTelescope.visitTelescopeLabel,
              }}
            />

            {modeledResult.hasHowBigData && (
              <ObjectHowBig objectId={objectId} />
            )}
          </CenterColumn>
        </section>

        <section className="off-white-bg-top-shadow">
          {objectData.hasBurnhamsData && (
            <Request
              model={burnhamsModel}
              serviceURL={BURNHAMS_CORNER_CONTENT}
              withoutUser
              requestBody={{ objectId }}
              render={({
                fetchingContent,
                modeledResponses: { BURNHAMS_CORNER },
              }) =>
                !fetchingContent && (
                  <Fragment>
                    <SterlingTitle
                      title={BURNHAMS_CORNER.title}
                      subTitle={BURNHAMS_CORNER.subTitle}
                    />
                    <CenterColumn widths={['768px', '965px', '965px']}>
                      <BurnhamsCorner {...BURNHAMS_CORNER.burnhamTileContent} />
                    </CenterColumn>
                  </Fragment>
                )
              }
            />
          )}

          <SterlingTitle
            title={modeledResult.objectDetails.panelHeading1}
            subTitle={modeledResult.objectDetails.panelHeading2}
          />

          {modeledResult.relatedObject.show && (
            <section className="off-white-bg">
              <CenterColumn widths={['768px', '965px', '965px']}>
                <ObjectRelatedTile
                  {...modeledResult.relatedObject}
                  additionalContent={
                    <LailaTile
                      iconURL={modeledResult.relatedObject.iconUrl}
                      title={modeledResult.relatedObject.imageTitle}
                      linkURL={modeledResult.relatedObject.linkUrl}
                    />
                  }
                />
              </CenterColumn>
            </section>
          )}

          {modeledResult.relatedStory.show && (
            <section className="off-white-bg">
              <CenterColumn widths={['768px', '965px', '965px']}>
                <ObjectRelatedTile
                  {...modeledResult.relatedStory}
                  showDescription={false}
                />
              </CenterColumn>
            </section>
          )}

          {modeledResult.relatedShow.show && (
            <section className="off-white-bg">
              <CenterColumn widths={['768px', '965px', '965px']}>
                <ObjectRelatedTile
                  {...modeledResult.relatedShow}
                  additionalContent={
                    <div
                      className="related-show"
                      onClick={() =>
                        this.navigateByURl(modeledResult.relatedShow.linkUrl)
                      }
                    >
                      <p className="related-show-title">
                        {modeledResult.relatedShow.imageTitle}{' '}
                      </p>
                      <GenericButton
                        theme={{ margin: '0 auto' }}
                        renderIcon={() => (
                          <img src="https://vega.slooh.com/assets/v4/icons/play_icon.svg" />
                        )}
                      />
                    </div>
                  }
                />
              </CenterColumn>
            </section>
          )}

          {modeledResult.relatedGuide.show && (
            <section className="off-white-bg">
              <CenterColumn widths={['768px', '965px', '965px']}>
                <ObjectRelatedTile
                  {...modeledResult.relatedGuide}
                  showMobileAdditionalContent
                  additionalContent={
                    <GuideTile
                      title={modeledResult.relatedGuide.imageLabel}
                      subTitle={modeledResult.relatedGuide.imageTitle}
                      linkUrl={modeledResult.relatedGuide.linkUrl}
                    />
                  }
                />
              </CenterColumn>
            </section>
          )}

          <SterlingTitle
            title={t('Objects.MVPAstronomers')}
            subTitle={t('Objects.MostActive', {
              objectTitle: objectData.objectTitle,
            })}
          />

          <CenterColumn widths={['768px', '965px', '965px']}>
            {objectSpecialists && objectSpecialists.specialistsCount > 0 ? (
              <div className="card-container__specialists">
                {objectSpecialists.specialistsList.map(item => (
                  <MVPAstronomer {...item} cardClass="contents-mvp-card" />
                ))}
              </div>
            ) : (
              <p className="error-message">
                {t('Objects.NoSpecialists', {
                  objectTitle: objectData.objectTitle,
                })}
              </p>
            )}
          </CenterColumn>
        </section>

        <style jsx>{style}</style>
      </Fragment>
    );
  }
}

Overview.propTypes = {
  params: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
  }).isRequired,
  actions: PropTypes.shape({}).isRequired,
  objectData: PropTypes.shape({
    objectTitle: PropTypes.string.isRequired,
    objectSubtitle: PropTypes.string.isRequired,
    objectRA: PropTypes.number.isRequired,
    objectDeclination: PropTypes.number.isRequired,
    objectMagnitude: PropTypes.number.isRequired,
    hasBurnhamsData: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Overview;
