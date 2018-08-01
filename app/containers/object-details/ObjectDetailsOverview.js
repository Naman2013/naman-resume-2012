/***********************************
* V4 Object Details Overview
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  fetchObjectDataAction, 
  fetchObjectSpecialistsAction 
} from '../../modules/object-details/actions';
import CenterColumn from '../../../app/components/common/CenterColumn';
import GuideSection from '../../../app/components/guides/GuideSection';
import GuideBodyContent from '../../../app/components/guides/GuideBodyContent';
import GuideContentList from '../../../app/components/guides/GuideContentList';
import DeviceProvider from '../../../app/providers/DeviceProvider';
import FollowObject from '../../../app/components/object-details/FollowObject';
import CardObservations from '../../../app/components/common/CardObservations';
import SterlingTitle from '../../../app/components/common/titles/SterlingTitle';

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
    fetchObjectSpecialistsAction
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Overview extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //console.log(this.props);
  }

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

    const topProps = {
      content: () => <GuideBodyContent title="About this object" content={objectData.objectDescription} />,
      column: () => (<GuideContentList list={['object type?', objectData.objectDomain, objectData.objectConstellation, <FollowObject / >]} />),
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
            <SterlingTitle title='featured observation' subTitle='community observation' theme={{ title: { color: 'white' }, subTitle: { color: 'white' } }} />
            <CenterColumn>
              <CardObservations {...tempProps} />
            </CenterColumn>
          </DeviceProvider>
        </section>

        <section className="off-white-bg">
          <SterlingTitle title='Prepare for your next mission' subTitle='Tools to help plan your next mission to The Moon' />
        
          <SterlingTitle title='MVP Astronomers' subTitle={"Most Active on " + objectData.objectTitle} />
          <CenterColumn>
            {objectSpecialists && objectSpecialists.specialistsCount > 0 ? (
              <div className="card-container__specialists">
                {Object.keys(objectSpecialists.specialistsList).map(function(key) {
                  return(
                    <div className="specialists-card" key={'card_' + key}>
                      <div className="specialists-icon"><img src={objectSpecialists.specialistsList[key].iconURL}/></div>
                      <h5>{objectSpecialists.specialistsList[key].displayName}</h5>
                      {objectSpecialists.specialistsList[key].hasLinkFlag &&                 
                        <a className="specialists-btn" href={objectSpecialists.specialistsList[key].linkURL}>View Specialist</a>
                      }
                    </div>
                  )
                })}
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
    )
  }
}
export default Overview;
Overview.propTypes = {
  params: PropTypes.shape({
    objectId: PropTypes.string,
  }).isRequired,
  actions: PropTypes.shape({ }).isRequired,
};

Overview.defaultProps = {
  actions: { },
  objectId: '',
};
