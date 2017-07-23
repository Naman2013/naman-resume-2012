import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyPicturesNavigation from '../../components/my-pictures/my-pictures-navigation';
import { fetchImageDetailsAndCounts } from '../../modules/my-pictures-image-details/actions';
import { setTags } from '../../modules/tag-management/Tags';
import MissionTags from '../../components/common/tags/mission-tags';
import ImageViewer from '../../components/my-pictures/ImageViewer';
import { imageDetailsStyle } from './ImageDetailsStyles';

const mapStateToProps = ({ myPicturesImageDetails }) => ({
  myPicturesImageDetails,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchImageDetailsAndCounts,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ImageDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorValue: props.myPicturesImageDetails.observationLog,
    };
  }
  componentWillMount() {
    window.scrollTo(0, 0);
    const {
      params: {
        customerImageId,
        shareToken,
        galleryId
      }
    } = this.props;
    this.props.actions.fetchImageDetailsAndCounts({
      customerImageId,
      shareToken,
    });
  }


  handleEditorChange = (editorHTML) => {
    this.setState({ editorValue: editorHTML });

    // make call to update changes
  }

  setObservationLog = (text) => {

  }

  render() {
    const {
      scheduledMissionId,
      observationLog,
      error,
      fetching,
      canEditFlag,
      imageTitle,
      imageURL,
      fileData,
    } = this.props.myPicturesImageDetails;

    return (
      <div>
        <MyPicturesNavigation
          page="photo-roll"
        />
        <div className="clearfix my-pictures-container">
          <div className="container">
            <div className="left title">
              <h2 dangerouslySetInnerHTML={{ __html: imageTitle }} />
            </div>
            <div className="right-top"></div>
          </div>
          <div className="container">
            <div className="left">
              <ImageViewer myPicturesImageDetails={this.props.myPicturesImageDetails}/>
            </div>
            <aside className="right">
              <h4 className="header">Observation Log</h4>
              {canEditFlag &&
                <div>
                  <textarea
                    id="observationLog"
                    cols="50"
                    rows="7"
                    value={this.state.editorValue}
                    onBlur={this.setObservationLog}
                    onChange={this.handleEditorChange}
                  />
                </div>
              }
              {!canEditFlag && observationLog.length > 0 ? <div dangerouslySetInnerHTML={{ __html: observationLog }} /> : <div>There is no observation log for this photo.</div>}
              <h4 className="header">Image Tags</h4>
              <div>
                <MissionTags
                  tagClass="image"
                  tagType="observation"
                  scheduledMissionId={Number(scheduledMissionId)}
                  canEditFlag={canEditFlag}
                />
              </div>
              <h4 className="header">File Data</h4>
              <div>{Object.keys(fileData).map((key) => {
                return <div key={key}><span className="bold">{key}</span>: {fileData[key]}</div>;
              })}</div>
            </aside>
          </div>
        </div>
        {imageDetailsStyle}
      </div>
    );
  }
}

ImageDetails.defaultProps = {
  myPicturesImageDetails: {
    fetching: false,
    error: false,
    imageTitle: '',
    imageURL: '',
    zoom: 0,
    originx: 0,
    originy: 0,
    observationLog: '',
    shareToken: '',
    likesCount: 0,
    canLikeFlag: false,
    showLikePrompt: false,
    likePrompt: '',
    canDownloadFlag: false,
    canEditFlag: false,
    fileData: {},
  },
  actions: {},
};

ImageDetails.propTypes = {
  myPicturesImageDetails: PropTypes.shape({
    fetching: PropTypes.bool,
    error: PropTypes.bool,
    imageTitle: PropTypes.string,
    imageURL: PropTypes.string,
    zoom: PropTypes.number,
    originx: PropTypes.number,
    originy: PropTypes.number,
    observationLog: PropTypes.string,
    shareToken: PropTypes.string,
    likesCount: PropTypes.number,
    canLikeFlag: PropTypes.bool,
    showLikePrompt: PropTypes.bool,
    likePrompt: PropTypes.string,
    canDownloadFlag: PropTypes.bool,
    canEditFlag: PropTypes.bool,
    fileData: PropTypes.shape({}),
  }),
  // actions: PropTypes.shape({
  //   fetchImageDetailsAndCounts,
  // }),
  params: PropTypes.shape({
    customerImageId: PropTypes.string,
    shareToken: PropTypes.string,
    galleryId: PropTypes.string,
  }).isRequired,
};

export default ImageDetails;
