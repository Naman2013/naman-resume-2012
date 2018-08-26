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

import CenterColumn from '../../../app/components/common/CenterColumn';

import TopicContent from 'components/guides/TopicContent';
import Request from 'components/common/network/Request';

import DeviceProvider from '../../../app/providers/DeviceProvider';
import CardObservations from '../../../app/components/common/CardObservations';
import SterlingTitle from '../../../app/components/common/titles/SterlingTitle';
import BurnhamsCorner from '../../../app/components/common/BurnhamsCorner';

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

const descriptionContent = 'Nam dapibus nisl vitae elit fringilla rutrum. Aenean lene lorem sollicitudin, erat a elementum toirutrum neeque sem pretium metuis, quis mollis nisl nunc it tristique de ullam ecorpere pretium…';
const tempProps = {
  title: 'The Moon!',
  author: 'JESSICA ANDERSON',
  descContent: descriptionContent,
  imageSrcUrl: 'https://vega.slooh.com/assets/v4/placeholder/moon_sample.jpg',
  likesCount: '1000',
  commentsCount: '007',
  detailsLinkUrl: 'https://www.slooh.com/',
  capturedDate: 'Jan 22, 2018',
};

const bcDesc = 'Nam dapibus nisl vitae elit fringilla rutrum. Aenean lene lorem sollicitudin, erat a elementum toirutrum neeque sem pretium metuis, quis mollis nisl nunc it  tristique de ullam ecorpere pretium…';

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
    topicContentList: ['Placeholder 1', 'Placeholder 2', 'Placeholder 3'],
    aboutTitle: resp.objectSubtitle,
    aboutContent: '<p>Some rando content...</p>',
    topicActionProps: {
      followButtonText: resp.followPrompt,
      followButtonIconURL: resp.followPromptIconUrl,
      showActions: resp.followActionIconUrl,
    },
  },
  statisticsTitle: {
    title: resp.objectSubtitle,
    subTitle: resp.objectTagline,
  },
  featuredObservation: {
    title: resp.featuredObservation.title,
    subTitle: resp.featuredObservation.subTitle,
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
              <CardObservations {...tempProps} />
            </CenterColumn>
          </DeviceProvider>
        </section>

        <section className="off-white-bg">
          <SterlingTitle {...modeledResult.statisticsTitle} />

          <CenterColumn>
            <section className="object-details-grid">
              <div className="f4">
                <h2>Scientific Name:</h2>
                <p>{objectData.objectTitle}</p>
              </div>
              <div className="f4">
                <h2>Celestial Coordinates:</h2>
                <p>RA: {objectData.objectRA}</p>
                <p>Dec: {objectData.objectDeclination}</p>
              </div>
              <div className="f2">
                <h2>Magnitude:</h2>
                <p>{objectData.objectMagnitude}</p>
              </div>
              <div className="f2">
                <h2>Apparent Angular Size:</h2>
                <p dangerouslySetInnerHTML={{ __html: '0° 31&#39; 50&#34;' }} />
              </div>
              <div className="f4">
                <h2>Visibility Season:</h2>
                <p>Chile: Aug - Feb</p>
                <p>Canary Islands: Jul - Apr</p>
              </div>
              <div className="f4">
                <h2>midnight culmination:</h2>
                <p>November 22</p>
                Lorem Ipsum viverra eleifent nun varius
              </div>
            </section>
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
              <div className="card-container__specialists">
                Sorry, there are no specialists for {objectData.objectTitle} available at this time.
              </div>
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
