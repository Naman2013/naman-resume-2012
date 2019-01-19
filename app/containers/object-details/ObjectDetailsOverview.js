/** *********************************
 * V4 Object Details Overview
 *   Markdown support on elements????
 *   UTF-8 support....
 *   Multi-National Languages.....
 ********************************** */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { BURNHAMS_CORNER_CONTENT } from 'services/content';

import {
  fetchObjectDataAction,
  fetchObjectSpecialistsAction,
} from '../../modules/object-details/actions';

import CenterColumn from 'components/common/CenterColumn';
import TopicContent from 'components/guides/TopicContent';
import Request from 'components/common/network/Request';

import DeviceProvider from 'providers/DeviceProvider';
import ObjectProfile from 'components/object-details/ObjectProfile';
import ObjectVisibilityProfile from 'components/object-details/ObjectVisibilityProfile';
import CardObservations from 'components/common/CardObservations';
import SterlingTitle from 'components/common/titles/SterlingTitle';
import BurnhamsCorner from 'components/common/BurnhamsCorner';
import GuidePanels from 'components/guides/GuidePanels';

import messages from './ObjectDetails.messages';
import style from './ObjectDetailsOverview.style';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectData: objectDetails.objectData,
  objectSpecialists: objectDetails.objectSpecialists,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchObjectDataAction,
      fetchObjectSpecialistsAction,
    },
    dispatch,
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
    aboutTitle: resp.objectSubtitle,
    aboutContent: resp.objectDescription,
    topicActionProps: {
      followButtonText: resp.followPrompt,
      followButtonIconURL: resp.followPromptIconUrl,
      showActions: resp.showFollowPromptFlag,
    },
  },
  statisticsTitle: {
    title: resp.objectSubtitle,
    subTitle: resp.objectTagline,
  },
  featuredObservation: {
    title: <FormattedMessage {...messages.FeaturedObservation} />,
    subTitle: <FormattedMessage {...messages.CommunityObservation} />,
    tileContent: {
      title: resp.featuredObservation.title,
      subTitle: resp.featuredObservation.subTitle,
      description: resp.featuredObservation.description,
      imageUrl: resp.featuredObservation.imageUrl,
      hasLink: resp.featuredObservation.hasLink,
      linkLabel: resp.featuredObservation.linkLabel,
      linkUrl: resp.featuredObservation.linkUrl,
    },
  },
  objectDetails: {
    nameLabel: resp.displayNameLabel,
    coordinatesLabel: resp.objectCoordinatesLabel,
    сoordinates: resp.objectCoordinatesDisplay,
    magnitudeLabel: resp.objectMagnitudeLabel,
    magnitude: resp.objectMagnitude,
    apparentAngularSizeLabel: resp.objectSizeArcSecondsLabel,
    apparentAngularSizeText: resp.objectSizeArcSecondsDisplay,
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
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Overview extends Component {
  render() {
    const {
      params: { objectId },
      objectData,
      objectSpecialists,
      intl,
      user,
    } = this.props;
    
    const modeledResult = modelData(objectData);

    // TODO: need something more substantial than this to prevent bad renders
    if (!modeledResult.topicContentProps.title) {
      return null;
    }
    
    return (
      <Fragment>
        <TopicContent {...modeledResult.topicContentProps} objectId={objectId} user={user} />

        <section className="blue-tile-bg">
          <DeviceProvider>
            <SterlingTitle
              {...modeledResult.featuredObservation}
              theme={{ title: { color: 'white' }, subTitle: { color: 'white' } }}
            />
            <CenterColumn widths={['768px', '965px', '965px']}>
              <CardObservations {...modeledResult.featuredObservation.tileContent} />
            </CenterColumn>
          </DeviceProvider>
        </section>

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
              }}
              midnightCulmination={{
                show: modeledResult.midnightCulmination.show,
                label: modeledResult.midnightCulmination.label,
                text: modeledResult.midnightCulmination.text,
                description: modeledResult.midnightCulmination.description,
              }}
              bestTelescope={{
                label: modeledResult.bestTelescope.label,
                list: modeledResult.bestTelescope.list,
                buttonCaption: modeledResult.bestTelescope.visitTelescopeLabel,
              }}
            />

            <ObjectVisibilityProfile objectId={objectId} />
          </CenterColumn>
        </section>

        <section className="off-white-bg-top-shadow">
          {objectData.hasBurnhamsData && (
            <Request
              model={burnhamsModel}
              serviceURL={BURNHAMS_CORNER_CONTENT}
              requestBody={{ objectId }}
              render={({ fetchingContent, modeledResponses: { BURNHAMS_CORNER } }) =>
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

          <GuidePanels guideId={objectId} />

          <SterlingTitle
            title={intl.formatMessage(messages.MVPAstronomers)}
            subTitle={intl.formatMessage(messages.MostActive, {
              objectTitle: objectData.objectTitle,
            })}
          />

          <CenterColumn widths={['768px', '965px', '965px']}>
            {objectSpecialists && objectSpecialists.specialistsCount > 0 ? (
              <div className="card-container__specialists">
                {objectSpecialists.specialistsList.map(item => (
                  <div className="specialists-card" key={`card_${item.customerId}`}>
                    <img className="specialists-icon" alt="" src={item.iconUrl} />
                    <h5>{item.displayName}</h5>
                    {item.hasLinkFlag && (
                      <a className="mvp-btn" href={item.linkUrl}>
                        {item.gravityRankLabel}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="error-message">
                <FormattedMessage
                  {...messages.NoSpecialists}
                  values={{ objectTitle: objectData.objectTitle }}
                />
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
  intl: intlShape.isRequired,
};

export default injectIntl(Overview);
