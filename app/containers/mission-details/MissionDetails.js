/* ********************************
 * V4 MissionDetails container
 ********************************* */

import React, { Component, Fragment, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { horizontalArrowRightWhite } from 'app/styles/variables/iconURLs'
import { fetchMissionPhotos } from 'app/modules/my-pictures/actions';

import style from './MissionDetails.style';

const mapStateToProps = ({ myPictures }, ownProps) => ({
  error: myPictures.missionPhotos.error,
  errorBody: myPictures.missionPhotos.errorBody,
  fetching: myPictures.missionPhotos.fetching,
  firstImageNumber: myPictures.missionPhotos.firstImageNumber,
  imageCount: myPictures.missionPhotos.imageCount,
  imageList: myPictures.missionPhotos.response.imageList,
  maxImageCount: myPictures.missionPhotos.maxImageCount,
  missionDateCreated: myPictures.missionPhotos.missionDateCreated,
  missionTitle: myPictures.missionPhotos.missionTitle,
  missionIconURL: myPictures.missionPhotos.missionIconURL,
  scheduledMissionId: ownProps.routeParams.missionId,
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchMissionPhotos,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class MissionDetails extends Component {
  static propTypes = {
    imageList: PropTypes.arrayOf(PropTypes.shape({})),
    scheduledMissionId: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      fetchMissionPhotos: PropTypes.func,
    }).isRequired,
  };

  static defaultProps = {
    imageList: [],
  }

  componentDidMount() {
    const { scheduledMissionId } = this.props.scheduledMissionId;
    this.props.actions.fetchMissionPhotos({ scheduledMissionId });
  }

  generateNavItems = list => list.map(item => ({ title: item.name, link: item.linkUrl }));

  render() {
    const { imageList } = this.props;
    
    return (
      <Fragment>
        <div className="header-wrapper">
          <div className="header">
            <img className="arrowBack" src={horizontalArrowRightWhite} alt="back" />
            <div className="back">Back</div>
          </div>
        </div>
        <section className="body">
          body
        </section>
        <style jsx>{style}</style>
      </Fragment>
    );
  }
}

export default MissionDetails;
