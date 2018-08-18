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
import {
  fetchObjectDataAction,
  fetchObjectSpecialistsAction,
} from '../../modules/object-details/actions';
import CenterColumn from '../../../app/components/common/CenterColumn';
import GuideSection from '../../../app/components/guides/GuideSection';
import GuideBodyContent from '../../../app/components/guides/GuideBodyContent';
import GuideContentList from '../../../app/components/guides/GuideContentList';
import DeviceProvider from '../../../app/providers/DeviceProvider';
import FollowObject from '../../../app/components/object-details/FollowObject';
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
    const bcProps = {
      title: 'Lorem Ipsum Dolar Set',
      author: 'Paul Cox',
      descContent: bcDesc,
      imageSrcUrl: 'https://vega.slooh.com/assets/v4/placeholder/moon_sample.jpg',
    };

    const topProps = {
      content: () => <GuideBodyContent title="About this object" content={objectData.objectDescription} />,
      column: () => (<GuideContentList list={['object type?', objectData.objectDomain, objectData.objectConstellation, <FollowObject />]} />),
      alignContent: 'left',
    };


    return (
      <Fragment>

        <section className="white-paper-bg">
          <CenterColumn theme={{
              position: 'relative',
              boxShadow: 'rgb(191, 191, 191) 0px 11px 20px -10px',
            }}
          >
            <h1>{objectData.objectSubtitle}</h1>
            <DeviceProvider>
              <GuideSection {...topProps} />
            </DeviceProvider>
          </CenterColumn>
        </section>

        <section className="blue-tile-bg">
          <DeviceProvider>
            <SterlingTitle
              title="featured observation"
              subTitle="community observation"
              theme={{ title: { color: 'white' }, subTitle: { color: 'white' } }}
            />
            <CenterColumn>
              <CardObservations {...tempProps} />
            </CenterColumn>
          </DeviceProvider>
        </section>

        <section className="off-white-bg">
          <SterlingTitle
            title="Prepare for your next mission"
            subTitle={`Tools to help plan your next mission to ${objectData.objectTitle}`}
          />

          <CenterColumn>
            <section className="object-details-grid">
              <div className="f4">
                <h2>Scientific Name:</h2>
                <p>Lorem Ipsum</p>
              </div>
              <div className="f4">
                <h2>Celestial Coordinates:</h2>
                <p>RA: 00h 42m 44.3s</p>
                <p>Dec:  +41°  16  08</p>
              </div>
              <div className="f2">
                <h2>Magnitude:</h2>
                <p>-27.00</p>
              </div>
              <div className="f2">
                <h2>Apparent Angular Size:</h2>
                <p>0° 31&apost; 50&quote;</p>
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
          <SterlingTitle title="Burnham's Corner" subTitle="Get Inspired with this find from Burnham's books" />
          <CenterColumn>
            <BurnhamsCorner {...bcProps} />
          </CenterColumn>

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
};

export default Overview;
