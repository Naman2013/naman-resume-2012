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
import ObjectVisibilityProfile from  'components/object-details/ObjectVisibilityProfile';
import CardObservations from 'components/common/CardObservations';
import SterlingTitle from 'components/common/titles/SterlingTitle';
import BurnhamsCorner from 'components/common/BurnhamsCorner';

import style from './ObjectDetailsOverview.style';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectData: objectDetails.objectData,
  objectSpecialists: objectDetails.objectSpecialists,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectDataAction,
    fetchObjectSpecialistsAction,
  }, dispatch),
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
    title: 'Featured observation',
    subTitle: 'Community Observation',
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
    ra: resp.objectRA,
    dec: resp.objectDeclination,
    magnitude: resp.objectMagnitude,
  },
  visibilitySeason: {
    title: resp.visibilitySeason.label,
    observatories: resp
      .visibilitySeason
      .observatories
      .map(obs => <p key={`visibility-season-${obs.label}-${obs.text}`}>{obs.label} {obs.text}</p>),
  },
  midnightCulmination: {
    label: resp.midnightCulmination.label,
    text: resp.midnightCulmination.text,
    description: resp.midnightCulmination.description,
  },
  bestTelescope: {
    label: resp.bestTelescopes.listTitle,
    list: resp.bestTelescopes.list,
  },
});

@connect(mapStateToProps, mapDispatchToProps)
class Overview extends Component {
  render() {
    const {
      params: {
        objectId,
      },
      objectData,
      objectSpecialists,
    } = this.props;

    const modeledResult = modelData(objectData);

    // TODO: need something more substantial than this to prevent bad renders
    if (!modeledResult.topicContentProps.title) { return null; }

    return (
      <Fragment>
        <TopicContent
          {...modeledResult.topicContentProps}
          guideId={objectId}
        />

        <section className="blue-tile-bg">
          <DeviceProvider>
            <SterlingTitle
              {...modeledResult.featuredObservation}
              theme={{ title: { color: 'white' }, subTitle: { color: 'white' } }}
            />
            <CenterColumn>
              <CardObservations {...modeledResult.featuredObservation.tileContent} />
            </CenterColumn>
          </DeviceProvider>
        </section>

        <section className="off-white-bg">
          <SterlingTitle {...modeledResult.statisticsTitle} />
          <CenterColumn>
            <ObjectProfile
              scienceName={objectData.objectTitle}
              objectSpecs={modeledResult.objectDetails}
              visibilitySeason={{
                title: modeledResult.visibilitySeason.title,
                observatories: modeledResult.visibilitySeason.observatories,
              }}
              midnightCulmination={{
                label: modeledResult.midnightCulmination.label,
                text: modeledResult.midnightCulmination.text,
                description: modeledResult.midnightCulmination.description,
              }}
              bestTelescope={{
                label: modeledResult.bestTelescope.label,
                list: modeledResult.bestTelescope.list,
              }}
            />

            <ObjectVisibilityProfile />
          </CenterColumn>
        </section>

        <section className="off-white-bg-top-shadow">
          {
            objectData.hasBurnhamsData &&
              <Request
                model={burnhamsModel}
                serviceURL={BURNHAMS_CORNER_CONTENT}
                requestBody={{ objectId }}
                render={({
                  fetchingContent,
                  modeledResponses: { BURNHAMS_CORNER },
                }) => !fetchingContent && (
                  <Fragment>
                    <SterlingTitle
                      title={BURNHAMS_CORNER.title}
                      subTitle={BURNHAMS_CORNER.subTitle}
                    />
                    <CenterColumn>
                      <BurnhamsCorner {...BURNHAMS_CORNER.burnhamTileContent} />
                    </CenterColumn>
                  </Fragment>
                )}
              />
          }

          <SterlingTitle
            title="MVP Astronomers"
            subTitle={`Most Active on ${objectData.objectTitle}`}
          />

          <CenterColumn>
            {objectSpecialists && objectSpecialists.specialistsCount > 0 ? (
              <div className="card-container__specialists">
                {Object.keys(objectSpecialists.specialistsList).map(key => (
                  <div className="specialists-card" key={`card_${key}`}>
                    <div className="specialists-icon">
                      <img alt="" src={objectSpecialists.specialistsList[key].iconURL} />
                    </div>
                    <h5>{objectSpecialists.specialistsList[key].displayName}</h5>
                    {objectSpecialists.specialistsList[key].hasLinkFlag &&
                      <a className="specialists-btn" href={objectSpecialists.specialistsList[key].linkURL}>View Specialist</a>
                    }
                  </div>
                ))}
              </div>
            ) : (
              <p className="error-message">
                Sorry, there are no specialists for {objectData.objectTitle} available at this time.
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
  actions: PropTypes.shape({ }).isRequired,
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
